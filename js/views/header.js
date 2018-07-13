define(['backbone.marionette',
    'tpl!templates/header.html'], 
    function (Marionette, template) {
    

    return Marionette.View.extend({
        tagName: 'nav',
        className: 'navbar',
        template: template,
    })

})
