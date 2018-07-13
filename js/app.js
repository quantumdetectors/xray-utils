define(['backbone', 'backbone.marionette',
    'views/main',
    'json!config.json',
    'jquery'],
function(Backbone, Marionette, MainView, config, $) {


    // https://medium.com/@firt/progressive-web-apps-on-ios-are-here-d00430dee3a7

    var App = Marionette.Application.extend({
        region: 'body',

        onStart: function() {
            this.config = config
            this.appurl = config.appurl

            this.bc = new Backbone.Collection()

            require(['router'], this.starthistory.bind(this))

            this.main = new MainView({ bc: this.bc })
            this.showView(this.main)

            this.content = this.main.getRegion('content')
        },


        starthistory: function() {
            console.log('start history')
            if(Backbone.history){
                Backbone.history.start({ pushState: true, root: app.appurl })
                
                if (Backbone.history && Backbone.history._hasPushState) {
                    var $document = $(window.document)
                    var openLinkInTab = false
                    
                    var is_relative_to_page = function(href) {
                        return href.match(/^\/|(http:|https:|ftp:|mailto:|javascript:)/) === null
                    }
                    
                    var is_routable = function(href) {
                        console.log('routable', href.indexOf('/'))
                        return href.indexOf('#') === -1 && (is_relative_to_page(href) || href.indexOf(Backbone.history.root) > -1 || href.indexOf('/') == 0) && (href.indexOf(app.apiurl) != 0)
                    }

                    $document.keydown(function(e) {
                        if (e.ctrlKey || e.keyCode === 91) {
                            openLinkInTab = true
                        }
                    })
                    
                    $document.keyup(function(e) {
                        openLinkInTab = false
                    })
                    
                    $document.on('click', 'a', function(e) {
                        var href =  $(this).attr('href')
                        if (!href) return
                        if (is_routable(href)) {
                            e.preventDefault()
                            Backbone.history.navigate(href, true)
                        } 
                    })
                }
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
