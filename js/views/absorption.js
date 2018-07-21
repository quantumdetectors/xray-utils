define(['backbone.marionette',
    'utils/mucalc',
    'views/absplot',
    'models/material',
    'collections/materials',
    'json!tables/materials.json',
    'utils/indexdb',
    'tpl!templates/absorption.html', 'tpl!templates/newmaterial.html'], function(Marionette, 
    MuCalc, AbsorptionPlot,
    Material, Materials, materials,
    Store,
    template, newmaterial) {


    var NewMaterialView = Marionette.View.extend({
        template: newmaterial,

        events: {
            'click button[name=cancel]': 'cancel',
            'click button[name=save]': 'save',
        },

        ui: {
            name: 'input[name=name]',
            formula: 'input[name=formula]',
            density: 'input[name=density]',
        },

        cancel: function() {
            this.destroy()
        },

        save: function(e) {
            if (!this.$el.find('form')[0].checkValidity()) return
            e.preventDefault()
            this.model.set({
                name: this.ui.name.val(),
                formula: this.ui.formula.val(),
                density: this.ui.density.val(),
                custom: true
            })

            this.getOption('collection').add(this.model)
            this.cancel()
        },

        initialize: function(options) {
            this.model = new Material()
        }
    })


    var SelectedMaterialView = Marionette.View.extend({
        template: _.template('<div class="label"><%-name%></div><div class="field"><input type="number" name="thickness"/></div><div class="units">&micro;m</div><div class="result"></div><div class="buttons"><button name="remove">x</button>'),
        className: 'form',
        ui: {
            thickness: 'input[name=thickness]',
            res: '.result',
        },

        events: {
            'change @ui.thickness': 'calcMu',
            'keyup @ui.thickness': 'calcMu',
            'click button[name=remove]': 'removeModel',
        },

        initialize: function() {
            this.getOption('energy').on('keyup', this.calcMu.bind(this))
            this.calcMu = _.debounce(this.calcMu.bind(this), 100)
        },

        onDomRefresh: function() {
            console.log('render sel', this.$el.offset().top)
            $('html, body').animate({ scrollTop: 0 }, 1000)
            this.ui.thickness.focus()
        },

        removeModel: function(e) {
            e.preventDefault()
            this.model.collection.remove(this.model)
        },
        
        calcMu: function(e) {
            var p = this.model.calcMu({ energy: this.getOption('energy').val(), thickness: parseFloat(this.ui.thickness.val())*1e-6, set: true })
            p.then(this.showCalcMu.bind(this))
        },

        showCalcMu: function() {
            this.ui.res.html('Absorbs '+this.model.get('absorption').absamount.toFixed(1)+'% Length: '+ (this.model.get('absorption').abslen/1e-6).toFixed(2)+'&micro;m')
        }
    })


    var SelectedView = Marionette.CollectionView.extend({
        childView: SelectedMaterialView,
    })


    var MaterialItemView = Marionette.View.extend({
        className: function() {
            return 'element'+(this.model.get('custom') ? ' custom': '')
        },
        template: _.template('<% if (custom) { %><button name="delete" class="right">x</button><% } %><h2><%-name%></h2><span class="formula"><%-formula_formatted%></span>'),
        events: {
            'click button[name="delete"]': 'deleteCustom',
            'click': 'addMaterial',
        },

        addMaterial: function(e) {
            e.preventDefault()
            if ($(e.target).is('button[name="delete"]')) return
            console.log('add done')
            this.model.collection.trigger('select', this.model)
        },

        deleteCustom: function(e) {
            e.preventDefault()

            var m = this.getOption('custommaterials').findWhere({ name: this.model.get('name'), formula: this.model.get('formula') })
            if (m) {
                this.getOption('custommaterials').remove(m)
            }
        },
    })


    var MaterialsView = Marionette.CollectionView.extend({
        className: 'materials',
        childView: MaterialItemView,
    })


    var filteredCollection = function(collection, filterfn) {
        var filtered = new collection.constructor();
        filtered._callbacks = {};
        filtered._currentFilter = filterfn
 
        filtered.filterItems = function(filter) {
            var items = collection.filter(filter)
            filtered.reset(items)
            return filtered
        }
 
        collection.on('reset change destroy', function() {
            return filtered.filterItems(filtered._currentFilter);
        })
 
        return filtered.filterItems(filterfn);
    }

    return Marionette.View.extend({
        template: template,

        regions: {
            materials: {
                el: '.materials',
                replaceElement: true,
            },
            selected: {
                el: '.selected',
                replaceElement: true,
            },

            plot: {
                el: '.plot',
                replaceElement: true,
            },
            nm: '.newmaterial'
        },

        ui: {
            search: 'input[name=search]',
            energy: 'input[name=energy]',
        },

        events: {
            'keyup @ui.search': 'filterList',
            'click button[name=add]': 'addMaterial',
        },

        initialize: function() {
            this.custommaterials = new Materials()
            this.listenTo(this.custommaterials, 'add remove reset', this.updateCustomMaterials)

            this.materials = new Materials()
            this.listenTo(this.materials, 'select', this.selectMaterial)

            this.selected = new Materials()

            this.store = new Store()
            this.getCustomMaterials()         
        }, 


        getCustomMaterials: function() {
            var self = this
            this.store.get({ store: 'materials' }).then(function(custom) {
                console.log('got custom', custom)
                self.custommaterials.reset(custom)
            })
        },

        updateCustomMaterials: function(m, col, c) {
            // console.log('updateCustomMaterials', m, arguments)
            var all = materials.concat(this.custommaterials.toJSON())
            this.materials.reset(all).sort()
            if (m instanceof Material) {
                this.store.save({ store: 'materials', objects: this.custommaterials.toJSON() }).then(function() {
                    console.log('saved custom materials')
                })
                if (c.add) this.selected.add(m.clone())
            }
        },


        addMaterial: function(e) {
            e.preventDefault()
            this.getRegion('nm').show(new NewMaterialView({ collection: this.custommaterials }))
        },


        selectMaterial: function(m) {
            console.log('select mat', m)
            this.selected.add(m.clone())
        },

        filterList: function(e) {
            console.log('filter list')
            this.materials.trigger('reset')
        },

        filter: function(m) {
            var val = this.ui.search.val().toLowerCase()
            return m.get('name').toLowerCase().startsWith(val) || m.get('formula').toLowerCase().includes(val)
        },
        
        onRender: function() {
            var flt = filteredCollection(this.materials, this.filter.bind(this))
            this.getRegion('materials').show(new MaterialsView({ 
                collection: flt, 
                childViewOptions: {
                    custommaterials: this.custommaterials
                }
            }))

            this.getRegion('selected').show(new SelectedView({ 
                collection: this.selected, 
                childViewOptions: {
                    energy: this.ui.energy
                }
            }))

            this.getRegion('plot').show(new AbsorptionPlot({
                collection: this.selected,
                energy: this.ui.energy
            }))

        },

        onDomRefresh: function() {
            this.ui.search.focus()
        }

    })


})
