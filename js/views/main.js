define(['backbone.marionette',
    'views/header',
    'tpl!templates/main.html'], 
    function (Marionette, HeaderView, template) {
    


    return Marionette.View.extend({
        className: 'wrapper',
        template: template,
        regions: {
            header: '.page-header',
            content: '.page-content',
        },

        ui: {
            banner: '.install-banner',
        },

        events: {
            'click button[name=dismiss]': 'hideBanner',
        },

        onRender: function() {
            this.getRegion('header').show(new HeaderView())

            if (this.isIos() && !this.isInStandaloneMode()) {
                this.ui.banner.addClass('show')
            }
        },

        isIos: function() {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test( userAgent );
        },

        isInStandaloneMode: function()  {
            return ('standalone' in window.navigator) && (window.navigator.standalone)
        },


        hideBanner: function() {
            this.ui.banner.removeClass('show')
        },

    })

})