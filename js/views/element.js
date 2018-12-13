define(['backbone.marionette',
    'views/spectrum',
    'views/table',
    'views/anom',
    'tpl!templates/element.html'], function(Marionette, 
    SpectrumView, TableView, AnomalousView,
    template) {

    var PrecCell = Backgrid.NumberCell.extend({
        decimals: 5,
    })

    var FilterCell = Backgrid.Cell.extend({
        events: {
            'click': 'gotoFilter'
        },

        render: function() {
            this.$el.html('<button name="filter">Filter</button>')
            return this
        },

        gotoFilter: function(e) {
            if (e) e.preventDefault()
            app.trigger('show:filter', this.column.get('symbol'), this.model.get('siegbahn'))
        },
    })


    return Marionette.View.extend({
        className: 'page-panel',
        template: template,

        regions: {
            abs: '.abs',
            emis: '.emis',
            spec: '.spectra',
            anom: '.anom',
        },

        onRender: function() {
            console.log('el view', this.model)
            this.getRegion('abs').show(new TableView({
                collection: this.model.get('edges'),
                columns: [
                    { name: 'label', label: 'Edge', cell: 'string', editable: false },
                    { name: 'energy', label: 'Energy (keV)', cell: PrecCell, editable: false },
                    { name: 'yield', label: 'Yield', cell: PrecCell, editable: false },
                ],
                pages: false,
                backgrid: {
                    emptyText: 'No absorption edges for this element',
                }
            }))

            this.getRegion('emis').show(new TableView({
                collection: this.model.get('lines'),
                columns: [
                    { name: 'iupac', label: 'IUPAC', cell: 'string', editable: false },
                    { name: 'siegbahn', label: 'Siegbahn', cell: 'string', editable: false },
                    { name: 'energy', label: 'Energy (keV)', cell: PrecCell, editable: false },
                    { name: 'intensity', label: 'Intensity', cell: PrecCell, editable: false },
                    { label: '', cell: FilterCell, editable: false, symbol: this.model.get('symbol') },
                ],
                pages: false,
                backgrid: {
                    emptyText: 'No emission lines for this element',
                }
            }))

            if (this.model.get('lines').length) this.getRegion('spec').show(new SpectrumView({ model: this.model }))
            if (this.model.get('number') <= 92) this.getRegion('anom').show(new AnomalousView({ model: this.model, energy: this.model.get('edges').at(0).get('energy') }))
        }
    })


})
