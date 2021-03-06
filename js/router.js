define(['backbone.marionette', 'controller'],
function(Marionette, controller) {

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            'status': 'facility_status',
            
            'element': 'element_list',
            'element/:element': 'element',

            'filter/:element/:emission': 'filter',

            'abs': 'absorption',
            'ion': 'ionchamber',

            'about': 'about',

            '*home': 'element_list',
        },



        onRoute: function(name, path, args) {
            if (path == '*home') {
                path = 'element'
            }

            if (path.startsWith('element/')) {
                path = 'element'
            }

            $('.navbar-main a').removeClass('active')
            $('.navbar-main a').each(function(i,l) {
                var $l = $(l)
                var hr = $l.attr('href').replace(/#/, '')
                if (hr == path) $l.addClass('active')
            })
        }

    })


    return new Router({
        controller: controller
    })

})
