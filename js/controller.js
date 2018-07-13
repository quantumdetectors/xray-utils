define([
    'views/status',
    'views/elementlist',
    'views/element',
    'views/absorption',
    'views/ionchamber',

    'collections/elements',
    'json!tables/elements.json',
], function(
    StatusView, ElementListView, ElementView, AbsorptionView, IonChamberView,
    Elements, elements) {

    var controller = {

        facility_status: function() {
            app.bc.reset([{ title: 'Facility Status' }])
            app.content.show(new StatusView())
        },


        element_list: function() {
            var ecol = new Elements(elements)

            app.bc.reset([{ title: 'Element List' }])
            app.content.show(new ElementListView({ collection: ecol }))
        },


        element: function(element) {
            var ecol = new Elements(elements)
            var emodel = ecol.findWhere({ symbol: element })

            app.bc.reset([{ title: 'Element' }])
            if (emodel) {
                console.log('loading eview')
                app.content.show(new ElementView({ model: emodel }))
            } else {

            }
        },


        absorption: function() {
            var ecol = new Elements(elements)

            app.bc.reset([{ title: 'Absorption' }])
            app.content.show(new AbsorptionView({ elements: ecol }))
        },


        ionchamber: function() {
            app.bc.reset([{ title: 'Ion Chamber' }])
            app.content.show(new IonChamberView())
        },

    }


    app.on('show:element', function(element) {
        controller.element(element)
        app.navigate('/element/'+element)
    })


    return controller

})
