define(['backbone', 'backbone.marionette',
    'views/main',
    'jquery'],
function(Backbone, Marionette, MainView, $) {

    var App = Marionette.Application.extend({
        region: 'body',

        onStart: function() {
            this.bc = new Backbone.Collection()

            require(['router'], this.starthistory.bind(this))

            this.main = new MainView({ bc: this.bc })
            this.showView(this.main)

            this.content = this.main.getRegion('content')
            this.status = navigator.onLine ? 1 : 0
        },


        starthistory: function() {
            console.log('start history')
            if (Backbone.history){
                Backbone.history.start()
            }
        },


        navigate: function(route,  options){
            options || (options = {})
            Backbone.history.navigate(route, options)
        },

        mobile: function() {
            return $(window).width() < 568
        },

        
        convert: function(val) {
            var ev = 1.60218e-19
            var h = 6.62607004e-34
            var c = 2.99792458e8

            var ang = 1e-10
            return (h*c)/(ang*ev*val)
        },
    })


    window.app = new App()


    // Single Event for window scrolling
    $(window).scroll(_.debounce(function() {
        app.trigger('window:scroll')
    }, 10))

    $(window).resize(_.debounce(function() {
        app.trigger('window:resize')
    }, 50))


    // Trigger on/offline events
    window.addEventListener('online', function() {
        app.status = 1
        app.trigger('status', 1)
    })

    window.addEventListener('offline', function() {
        app.status = 0
        app.trigger('status', 0)
    })

    return app
  
})
