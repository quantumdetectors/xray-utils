define(['backbone.marionette',
    'utils/indexdb',
    'highmaps',
    'highmaps-world',
    'models/status',
    'collections/statuses',
    'json!tables/statuses.json',
    'tpl!templates/statuses.html', 'tpl!templates/facility.html',
    'Flot', 'Flot-selection', 'Flot-resize', 'Flot-time'], function(Marionette, 
    Store,
    Highcharts, world, 
    Status, Statuses, statuses,
    template, facility) {


    var FacilityView = Marionette.View.extend({
        template: facility,
        regions: {
            rstatus: '.status'
        },

        onRender: function() {
            this.getRegion('rstatus').show(this.model.get('beam_history') 
                ? (new JSONStatusView({ model: this.model })) 
                : (new SimpleStatusView({ model: this.model }))
            )
        }
    })


    var SimpleStatusView = Marionette.View.extend({
        template: _.template('<img class="status" /><div class="message"><p>Couldnt load status image</p></div>'),
        ui: {
            img: 'img.status',
            cap: '.message',
        },

        showImage: function() {
            if (this.destroyed) return

            var self = this
            this.timeout = setTimeout(function() {
                self.ui.img.addClass('show')
            }, 100)
        },


        errorImage: function() {
            console.log('error')
            this.ui.cap.show()
            this.ui.img.hide()
        },

        onRender: function() {
            this.ui.cap.hide()
            this.ui.img[0].onload = this.showImage.bind(this)
            this.ui.img[0].onerror = this.errorImage.bind(this)
            this.ui.img.attr('src', this.model.get('status_image'))
        },

        onDestroy: function() {
            this.destroyed = true
        },
    })


    var JSONStatusView = Marionette.View.extend({
        template: _.template('<figure></figure>'),

        ui: {
            fig: 'figure',
        },

        events: {
            plotselected: 'zoom',
            'dblclick canvas': 'reset',
            touchstart: 'touchStart',
        },

        touchStart: function(e) {
            if (e.originalEvent.touches && e.originalEvent.touches.length >  1) return
            e.preventDefault()
            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                if (this.lastClick && (new Date() - this.lastClick < 1000)) {
                    this.reset(e)
                    return
                }
                this.lastClick = new Date()
            }
        },

        reset: function(e) {
            this.zoom(e, {
                xaxis: { from: null, to: null },
                yaxis: { from: null, to: null },
            })
        },

        zoom: function(e, ranges) {
            console.log('zoom', e, ranges)
            if (!ranges.xaxis) return
            
            var opts = this.plot.getOptions()
            _.each(opts.xaxes, function(axis) {
                axis.min = ranges.xaxis.from
                axis.max = ranges.xaxis.to
            })
            _.each(opts.yaxes, function(axis) {
                axis.min = ranges.yaxis.from
                axis.max = ranges.yaxis.to
            })
            
            this.plot.setupGrid()
            this.plot.draw()
            this.plot.clearSelection()
        },

        initialize: function() {
            this.promise = Backbone.ajax({
                url: this.model.get('beam_history'),
                error: function(xhr, error) {
                    console.log('error', arguments)
                }
            })
        },

        onRender: function() {
            $.when(this.promise).done(this.doPlot.bind(this)).fail(this.onError.bind(this))
        },

        onError: function(e) {
            this.ui.fig.html('<div class="message"><p>Couldnt load status data</p></div>')
        },

        doPlot: function(resp, xhr) {
            console.log('doPlot')
            this.ui.fig.height(150)
            var options = {
                grid: {
                    borderWidth: 0,
                },

                selection: {
                    mode: 'xy',
                },

                xaxis: {
                    mode: 'time',
                },

                xaxes: [{
                    axisLabel: 'Time',
                }],

                yaxes: [{
                    axisLabel: 'Current (mA)',
                    min: 0,
                }],
            }

            var obj = resp
            if (this.model.get('obj')) {
                var objs = this.model.get('obj').split('.')
                _.each(objs, function(o) {
                    obj = obj[o]
                })
            }

            var data = []
            if (this.model.get('value') && this.model.get('timestamp')) {
                var skip;
                // if (obj.length > 200) skip = Math.round(obj.length / 200)

                _.each(obj, function(i, c) {
                    if (skip && c % skip) return

                    var val = i[this.model.get('value')]
                    if (this.model.get('unit') == 'A') val *= 1000

                    var ts = i[this.model.get('timestamp')]
                    if (this.model.get('timebase') != 'ms') ts *= 1000

                    data.push([ts, val])
                }, this)

            } else {
                data = obj
            }

            this.plot = $.plot(this.ui.fig, [data], options)
        },
    })


    return Marionette.View.extend({
        className: 'page-panel',
        template: template,

        regions: {
            rfacility: '.rfacility'
        },

        ui: {
            fac: 'select[name=facility]',
            offline: '.offline',
            map: '.map',
        },

        events: {
            'change @ui.fac': 'selectFacility',
            'click button[name=default]': 'saveDefault',
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


        populateFacilites: function() {
            this.ui.fac.html(this.statuses.opts())
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
            this.loadCustom()
            this.plotMap()
            this.populateFacilites()
            this.selectFacility()
        },


        plotClick: function(e) {
            this.ui.fac.val(e.point.name)
            this.updateFacility({ acronym: e.point.name })
        },

        selectFacility: function(e) {
            this.updateFacility({ acronym: this.ui.fac.val() })
            this.selectPoint({ acronym: this.ui.fac.val() })
        },

        selectPoint: function(options) {
            var pt = _.findWhere(this.plot.series[1].points, { name: options.acronym })
            if (pt) {
                pt.select(true)

                var s = this.statuses.findWhere({ acronym: options.acronym })
                var ll = this.plot.fromLatLonToPoint({ lat: s.get('lat'), lon: s.get('long') })

                this.plot.mapZoom()
                this.plot.mapZoom(0.1, ll.x, ll.y)
            }
        },


        updateFacility: function(options) {
            var s = this.statuses.findWhere({ acronym: options.acronym })
            if (s) this.getRegion('rfacility').show(new FacilityView({ model: s }))
        },

        pointFormatter: function(e) {
            var p = this.statuses.findWhere({ acronym : e.chart.hoverPoint.name })
            if (p) {
                return p.get('name')
            }
        },

        plotMap: function() {
            var data = []
            this.statuses.each(function(s) {
                data.push({ lat: s.get('lat'), lon: s.get('long'), name: s.get('acronym') })
            })

            this.plot = Highcharts.mapChart({
                chart: {
                    height: 200,
                    renderTo: this.ui.map[0],
                    backgroundColor:'rgba(255, 255, 255, 0.0)',
                },

                title: {
                    text: null
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                legend: {
                    enabled: false
                },

                plotOptions: {
                    series: {
                        events: {
                            click: this.plotClick.bind(this)
                        },
                        allowPointSelect: true,
                        marker: {
                            states: {
                                select: {
                                    fillColor: 'rgb(15, 144, 209)',
                                    lineWidth: 0
                                }
                            }
                        }
                    }
                },

                tooltip: {
                    formatter: this.pointFormatter.bind(this)
                },

                series: [{
                    // name: 'Counties',
                    mapData: Highcharts.maps['custom/world']
                },{
                    type: 'mappoint',
                    name: 'Facilities',
                    data: data,
                }]
            })
        },
    })



})