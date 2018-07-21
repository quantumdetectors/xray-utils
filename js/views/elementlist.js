define(['backbone.marionette',
    'tpl!templates/elementlist.html'], function(Marionette, 
    template) {


    var ElementItemView = Marionette.View.extend({
        className: function() {
            return 'element'+(!this.model.get('edges').length ? ' no-edges' : '')
        },
        template: _.template('<h2><%-name%></h2><span class="number"><%-number%></span><span class="symbol"><%-symbol%></span>'),
        events: {
            'click': 'gotoElement',
        },

        gotoElement: function(e) {
            e.preventDefault()
            app.trigger('show:element', this.model.get('symbol'))
        },
    })


    var ElementsView = Marionette.CollectionView.extend({
        className: 'elements',
        childView: ElementItemView,
    })


    var PeriodicElementView = Marionette.View.extend({
        template: _.template('<span class="number"><%-number%></span><h2><%-symbol%></h2><p><%-name%>'),
        className: function() {
            // console.log(this.model.get('symbol'), this.model.get('edges'))
            return 'periodic-element period-'+this.model.get('period')
                +(this.model.get('isSelected') ? ' selected' : '')
                +(!this.model.get('edges').length ? ' no-edges' : '')
        },

        events: {
            'click': 'gotoElement',
        },

        gotoElement: function(e) {
            e.preventDefault()
            app.trigger('show:element', this.model.get('symbol'))
        },
    })


    var PeriodItemView = Marionette.View.extend({
        className: 'item',
        template: _.template('<div class="el"></div>'),
        regions: {
            el: {
                el: '.el',
                replaceElement: true,
            }
        },

        onRender: function() {
            this.listenTo(this.getOption('elements'), 'reset change', this.renderModel)
            this.renderModel()
        },


        renderModel: function() {
            var ext = this.model.get('id') > 144 ? -1 : 0
            var el = this.getOption('elements').findWhere({ xpos: (this.model.get('id')%18)+1+ext, ypos: parseInt(this.model.get('id')/18)+1 })
            if (el) {
                this.getRegion('el').show(new PeriodicElementView({ model: el }))
            } else {
                this.getRegion('el').empty()
            }
        },
    })

    var PeriodicView = Marionette.CollectionView.extend({
        className: 'periodic-table',
        childView: PeriodItemView,

        onRender: function() {
            // console.log('render periodicview', this.getOption('elements'), this.childViewOptions)
            this.listenTo(this.childViewOptions.elements, 'reset', this.checkFiltered)
        },

        checkFiltered: function() {
            console.log('check filter')
            this.childViewOptions.elements.where({ isSelected: true }).length ? this.$el.addClass('filtered') : this.$el.removeClass('filtered')
        },
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


    // https://codepen.io/nemophrost/pen/EkImb
    return Marionette.View.extend({
        className: 'page-panel',
        template: template,

        regions: {
            elements: {
                el: '.elements',
                replaceElement: true,
            },
            pt: {
                el: '.periodic-table',
                replaceElement: true,
            }
        },

        ui: {
            search: 'input[name=search]',
        },

        events: {
            'keyup @ui.search': 'filterList',
        },

        initialize: function(options) {
            this.filterList = _.debounce(this.filterList.bind(this), 100)

            var pitems = []
            _.each(_.range(18*10), function(i) {
                pitems.push({ id: i })
            })
            this.perioditems = new Backbone.Collection(pitems)

            this.listenTo(app, 'window:resize', this.resize)
        },

        filterList: function(e) {
            console.log('filter list')
            this.collection.each(function(m) {
                m.set({ isSelected: this.filter(m) }, { silent: true })
            }, this)

            this.collection.trigger('reset')
        },

        filter: function(m) {
            var val = this.ui.search.val()
            if (!val) return true
            if (isNaN(val)) {
                return m.get('name').toLowerCase().startsWith(val.toLowerCase())
            } else {
                var val = parseFloat(val)
                var tol = 0.1 * val
                var found = false
                m.get('lines').each(function(l) {
                    if ((l.get('energy') > val - tol) && (l.get('energy') < val + tol)) found = true
                })

                return found
            }
        },
        
        onRender: function() {
            this.filtered = filteredCollection(this.collection, this.filter.bind(this))
            this.resize()
        },

        onDomRefresh: function() {
            this.ui.search.focus()
        },

        resize: function() {
            console.log('resize', app.mobile())
            if (app.mobile()) {
                this.getRegion('elements').show(new ElementsView({ collection: this.filtered }))
                this.getRegion('pt').empty()
            } else {
                this.getRegion('elements').empty()
                this.getRegion('pt').show(new PeriodicView({ 
                    collection: this.perioditems,
                    childViewOptions: {
                        elements: this.collection,
                    }
                }))
            }
        },
    })

})
