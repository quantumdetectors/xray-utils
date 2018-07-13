define(['backbone'], function(Backbone) {

	var LinesCollection = Backbone.Collection.extend({

    })

    var EdgeModel = Backbone.Model.extend({
        idAttribute: 'edgeid',

        initialize: function(attrs, options) {
            this.set({ 
                lines: new LinesCollection(this.get('lines'))
            }, { silent: true })
        },
    })


    var EdgesCollection = Backbone.Collection.extend({
        model: EdgeModel,
    })

    var McMasterModel = Backbone.Model.extend({

    })    

    return Backbone.Model.extend({
        
        initialize: function(attrs, options) {
            var all_lines = []
            _.each(this.get('edges'), function(e) {
                _.each(e.lines, function(l) {
                    l.sum_yield = l.intensity*e.yield
                    all_lines.push(l)
                })
            })

        	this.set({ 
        		edges: new EdgesCollection(this.get('edges')),
                lines: new LinesCollection(all_lines),
                mcm: new McMasterModel(this.get('mcm'))
        	}, { silent: true })
        },	

    })

})
