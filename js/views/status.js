define(['backbone.marionette',
    'utils/indexdb',
    'models/status',
    'collections/statuses',
    'json!tables/statuses.json',
    'tpl!templates/statuses.html'], function(Marionette, 
    Store,
    Status, Statuses, statuses,
    template) {


    return Marionette.View.extend({
        className: 'page-panel',
        template: template,

        ui: {
            fac: 'select[name=facility]',
            img: 'img.status',
            offline: '.offline',
        },

        events: {
            'change @ui.fac': 'updateFacility',
            'click button[name=default]': 'saveDefault',
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

            this.store = new Store()
            this.customfacilities = new Statuses()
            
            this.listenTo(app, 'status', this.updateStatus)
        },

        updateStatus: function() {
            app.status ? this.ui.offline.removeClass('show') : this.ui.offline.addClass('show')
        },


        loadCustom: function() {
            var self = this
            this.store.get({ store: 'facilities' }).then(function(custom) {
                console.log('got custom facilites', custom)
                self.customfacilities.reset(custom)
                self.setDefault()
            })
        },

        setDefault: function() {
            var d = this.customfacilities.findWhere({ name: 'default' })
            if (d) {
                this.ui.fac.val(d.get('value')).trigger('change')
            }
        },


        saveDefault: function(e) {
            e.preventDefault()
            var d = this.customfacilities.findWhere({ name: 'default' })
            if (!d) {
                d = new Status({ name: 'default' })
                this.customfacilities.add(d)
            }
            d.set({ value: this.ui.fac.val() })

            this.store.save({ store: 'facilities', objects: this.customfacilities.toJSON() }).then(function() {
                console.log('saved default facility')
            })
        },


        onRender: function() {
            this.ui.img[0].onload = this.showFacility.bind(this)
            this.populateFacilites()
            this.updateFacility()
            this.loadCustom()
            this.updateStatus()
        }
    })



})