define(['backbone.marionette',
	'views/table',
	'tpl!templates/fluofilter.html'], function(Marionette, 
		TableView,
		template) {


	var PrecCell = Backgrid.NumberCell.extend({
        decimals: 5,
    })


	return Marionette.View.extend({
		className: 'page-panel',
		template: template,

		regions: {
            abs: '.abs',
            emis: '.emis',
            filters: '.filters'
        },


        initialize: function(options) {
        	var e = this.model.get('lines').findWhere({ siegbahn: options.emission })
    		this.emission = e

        	var edges = e.get('iupac').split('-')
        	if (edges.length) {
        		var ed = this.model.get('edges').findWhere({ label: edges[0] })
        	}
        	this.edge = ed

        	this.filters = new Backbone.Collection()
        	this.findFilters()
        },


        findFilters: function() {
        	var eden = this.edge.get('energy')
        	var fluo = this.emission.get('energy')
        	var els = this.getOption('elements').clone().filter(function(e) {
        		var edges = e.get('edges').filter(function(ed) {
        			if (ed.get('label') != 'K' && ed.get('label') != 'L3') return
        			return ed.get('energy') < eden && ed.get('energy') > fluo
        		})

        		if (edges.length) {
        			if (edges.length > 1) console.log(edges.length)
        			var ed = edges[0]
        			e.set({
        				edge: ed.get('label'),
        				energy: ed.get('energy'),
        				yield: ed.get('yield'),
        			}, { silent: true })
        		}

        		return edges.length
        	}, this)

        	this.filters.reset(els)
        },


		onRender: function() {
			this.getRegion('abs').show(new TableView({
                collection: new Backbone.Collection([this.edge]),
                columns: [
                    { name: 'label', label: 'Edge', cell: 'string', editable: false },
                    { name: 'energy', label: 'Energy (keV)', cell: PrecCell, editable: false },
                ],
                pages: false,
                backgrid: {
                    emptyText: 'No absorption edges for this element',
                }
            }))

            this.getRegion('emis').show(new TableView({
                collection: new Backbone.Collection([this.emission]),
                columns: [
                    { name: 'iupac', label: 'IUPAC', cell: 'string', editable: false },
                    { name: 'siegbahn', label: 'Siegbahn', cell: 'string', editable: false },
                    { name: 'energy', label: 'Energy (keV)', cell: PrecCell, editable: false },
                ],
                pages: false,
                backgrid: {
                    emptyText: 'No emission lines for this element',
                }
            }))

            this.getRegion('filters').show(new TableView({
                collection: this.filters,
                columns: [
                    { name: 'symbol', label: 'Element', cell: 'string', editable: false },
                    { name: 'edge', label: 'Edge', cell: 'string', editable: false },
                    { name: 'energy', label: 'Energy (keV)', cell: PrecCell, editable: false },
                    { name: 'yield', label: 'Yield', cell: PrecCell, editable: false },
                ],
                pages: false,
                backgrid: {
                    emptyText: 'No filters for this element / emission line',
                }
            }))
		}

	})


})
