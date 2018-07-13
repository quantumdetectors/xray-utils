define(['backbone.marionette',
    'views/spectrum',
    'views/table',
    'tpl!templates/element.html'], function(Marionette, 
    SpectrumView, TableView,
    template) {

    var PrecCell = Backgrid.NumberCell.extend({
        decimals: 5,
    })

    return Marionette.View.extend({
        template: template,

        regions: {
            abs: '.abs',
            emis: '.emis',
            spec: '.spectra',
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
                    emptyText: 'No absorption edges for this element'
                }
            }))

            this.getRegion('emis').show(new TableView({
                collection: this.model.get('lines'),
                columns: [
                    { name: 'iupac', label: 'IUPAC', cell: 'string', editable: false },
                    { name: 'siegbahn', label: 'Siegbahn', cell: 'string', editable: false },
                    { name: 'energy', label: 'Energy (keV)', cell: PrecCell, editable: false },
                    { name: 'intensity', label: 'Intensity', cell: PrecCell, editable: false },
                ],
                pages: false,
                backgrid: {
                    emptyText: 'No emission lines for this element'
                }
            }))

            if (this.model.get('lines').length) this.getRegion('spec').show(new SpectrumView({ model: this.model }))
        }
    })


})
