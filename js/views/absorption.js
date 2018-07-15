define(['backbone.marionette',
    'utils/mucalc',
    'views/absplot',
    'collections/materials',
    'json!tables/materials.json',
    'tpl!templates/absorption.html'], function(Marionette, 
    MuCalc, AbsorptionPlot,
    Materials, materials,
    template) {



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

        removeModel: function() {
            this.model.destroy()
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
        className: 'element',
        template: _.template('<h2><%-name%></h2><span class="formula"><%-formula_formatted%></span>'),
        events: {
            'click': 'addMaterial',
        },

        addMaterial: function(e) {
            e.preventDefault()
            this.model.collection.trigger('select', this.model)
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
            }
        },

        ui: {
            search: 'input[name=search]',
            energy: 'input[name=energy]',
        },

        events: {
            'keyup @ui.search': 'filterList',
        },

        initialize: function() {
            this.materials = new Materials(materials)
            this.listenTo(this.materials, 'select', this.selectMaterial)
            this.selected = new Materials()            
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
        
    })


})
