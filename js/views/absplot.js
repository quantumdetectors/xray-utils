define(['backbone.marionette',
    'jquery', 'Flot', 'Flot-selection', 'Flot-resize',
    ], function(Marionette,
        $) {

    return Marionette.View.extend({
        className: 'absorption-plot',
        template: _.template('<h2>Energy vs Absorption</h2><div class="loading"><div class="loader"></div></div><figure></figure>'),

        ui: {
            fig: 'figure',
            load: '.loading',
        },

        events: {
            plotselected: 'zoom',
            'dblclick canvas': 'reset',
            touchstart: 'touchStart',
        },

        initialize: function() {
            this.plotAbsorption = _.debounce(this.plotAbsorption.bind(this), 1000)
            this.listenTo(this.collection, 'change:absorption reset remove add', this.plotAbsorption)
        },

        onRender: function() {
            this.ui.fig.height($(window).height()*0.4)
            this.ui.load.height($(window).height()*0.4)
            this.$el.hide()
        },

        onDomRefresh: function() {
            this.plotAbsorption()
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


        plotAbsorption: function() {
            if (!this.collection.length) return
            if (!_.reduce(this.collection.pluck('thickness'), function(memo, num) { return memo + num}, 0)) return
            console.log('plotting abs')
            this.$el.show()
            this.ui.load.show()

            setTimeout(this.doPlotAbsorption.bind(this), 200)
        },

        doPlotAbsorption: function() {
            var e = parseFloat(this.getOption('energy').val())
            var options = {
                grid: {
                    borderWidth: 0,
                    markings: [
                        { xaxis: { from:  e, to: e }, yaxis: { from: 0, to: 100 }, color: "#aaa" },
                    ]
                },

                selection: {
                    mode: 'xy',
                },

                xaxes: [{
                    axisLabel: 'Energy (keV)',
                }],

                yaxes: [{
                    axisLabel: 'Absorption (%)',
                    max: 100,
                    min: 0,
                }],
            }

            var workers = []
            var data = []
            this.collection.each(function(mat) {
                if (!mat.get('thickness')) return
                var series = { label: mat.get('name'), data: [] }

                var p = mat.calcMu({ energies: _.range(1,30,0.1) })
                workers.push(p)

                p.then(function(data) {
                    _.each(data, function(pt) {
                        series.data.push([pt.energy, pt.absamount])
                    })
                })
                data.push(series)
            }, this)

            var self = this
            Promise.all(workers).then(function(d) {
                console.log('all workers done', data)
            
                self.plot = $.plot(self.ui.fig, data, options)
                self.$el.show()
                self.ui.load.hide()    
            }, this)

            
        },

    })

})
