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
    })


    window.app = new App()


    // Single Event for window scrolling
    $(window).scroll(_.debounce(function() {
        app.trigger('window:scroll')
    }, 10))

    $(window).resize(_.debounce(function() {
        app.trigger('window:resize')
    }, 50))



    return app
  
})
