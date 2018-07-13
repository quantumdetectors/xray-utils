define(['backbone.marionette',
    'collections/statuses',
    'json!tables/statuses.json',
    'tpl!templates/statuses.html'], function(Marionette, 
    Statuses, statuses,
    template) {


    return Marionette.View.extend({
        template: template,

        ui: {
            fac: 'select[name=facility]',
            img: 'img.status',
        },

        events: {
            'change @ui.fac': 'updateFacility',
        },


        updateFacility: function() {
            var f = this.statuses.findWhere({ facility: this.ui.fac.val() })
            if (f) {
                console.log('loading image')
                this.ui.img.removeClass('show')

                var self = this
                setTimeout(function() {
                    self.ui.img.attr('src', f.get('status'))
                }, 500)
                
            }
        },

        showFacility: function() {
            console.log('image loaded')
            var self = this
            setTimeout(function() {
                self.ui.img.addClass('show')
            }, 100)
        },


        populateFacilites: function() {
            this.ui.fac.html(this.statuses.opts())
        },

        
        initialize: function(options) {
            this.statuses = new Statuses(statuses)
        },


        onRender: function() {
            this.ui.img[0].onload = this.showFacility.bind(this)
            this.populateFacilites()
            this.updateFacility()
        }
    })



})