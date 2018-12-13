define(['backbone.marionette',
    'jquery', 'Flot', 'Flot-selection', 'Flot-resize',
    ], function(Marionette,
        $) {

    return Marionette.View.extend({
        template: _.template('<h2>Theoretical Spectrum</h2><figure></figure>'),

        ui: {
            fig: 'figure',
        },

        events: {
            plotselected: 'zoom',
            'dblclick canvas': 'reset',
            touchstart: 'touchStart',
        },

        initialize: function() {

        },

        onRender: function() {
            this.ui.fig.height($(window).height()*0.4)
        },

        onDomRefresh: function() {
            this.plotSpectrum()
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


        plotSpectrum: function() {
            var options = {
                grid: {
                    borderWidth: 0,
                },

                selection: {
                    mode: 'xy',
                },

                xaxes: [{
                    axisLabel: 'Energy (eV)',
                }],

                yaxes: [{
                    axisLabel: 'Intensity',
                }],
            }

            var emis = this.model.get('lines')
            var data = this.generateSeries({ min: _.min(emis.pluck('energy')), max: _.max(emis.pluck('energy')) })
            emis.each(function(l) {
                data = this.generateFn({ energy: l.get('energy'), yield: l.get('sum_yield'), data: data })
            }, this)

            this.plot = $.plot(this.ui.fig, [data], options)
        },


        generateSeries: function(options) {
            var data = []
            var range = options.max-options.min
            if (range < 1) range = 2
            var max = Math.round(((range+options.min)*2) * 10)*10
            _.each(_.range(max), function(i) {
                data.push([i/100, 0])
            })

            return data
        },


        // https://en.wikipedia.org/wiki/Spectral_line_shape
        // https://en.wikipedia.org/wiki/Voigt_profile#Pseudo-Voigt_approximation
        generateFn: function(options) {
            var bin = Math.round(options.energy*10)*10
            var fwhm = 10
            _.each(_.range(bin-(fwhm*10),bin+(fwhm*10)), function(v, i) {
                // options.data[v][1] += options.yield*Math.exp(-(Math.pow(v-bin,2)/(2*Math.pow(fwhm,2))))
                if (options.data[v]) options.data[v][1] += this.fnGaussian({ height: options.yield, x: v, centre: bin, sigma: fwhm })
                // options.data[v][1] += this.fnLorentzian({ height: options.yield, x: v, centre: bin, sigma: fwhm })
            }, this)

            return options.data
        },

        fnGaussian: function(options) {
            return options.height*Math.exp(-(Math.pow(options.x-options.centre,2)/(2*Math.pow(options.sigma,2))))
        },

        fnLorentzian: function(options) {
            return options.height*(1/Math.PI)*((0.5*options.sigma)/(Math.pow(options.x-options.centre,2)+Math.pow(0.5*options.sigma,2)))
        }

    })

})
