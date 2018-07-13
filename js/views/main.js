define(['backbone.marionette',
    'views/header',
    'tpl!templates/main.html'], 
    function (Marionette, HeaderView, template) {
    


    return Marionette.View.extend({
        template: template,
        regions: {
            header: '.page-header',
            content: '.page-content'
        },

        onRender: function() {
            this.getRegion('header').show(new HeaderView())
        },

    })

})