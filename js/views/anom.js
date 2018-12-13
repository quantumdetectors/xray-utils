define(['backbone.marionette'], 
    function(Marionette) {

	var Anom = Marionette.View.extend({
        template: _.template('<h2>Anomalous Dispersion</h2><figure></figure><figcaption><input type="text" name="anome" value="<%-energy%>" /><ul><li><span class="title">f&#39;</span><span class="f1"></span>e<span class="super">-</span></li><li><span class="title">f&quot;</span><span class="f2"></span>e<span class="super">-</span></li></ul></figcaption>'),
        ui: {
            fig: 'figure',
            e: 'input[name=anome]',
            f1: '.f1',
            f2: '.f2',
        },

        events: {
            'keyup @ui.e': 'setE',
            'change @ui.e': 'setE',
            plotclick: 'selectEnergy',
            plotselected: 'zoom',
            'dblclick canvas': 'reset',
            'touchstart @ui.fig': 'touchStart',
        },

        templateContext: function() {
            return {
                energy: this.getOption('energy')
            }
        },

        selectEnergy: function(e, item, series) {
            if (series == undefined) return false
            console.log('selectEnergy', item.x)
            this.ui.e.val(item.x.toFixed(5))
            this.showValues()
        },

        constructor: function(options) {
            this.setE = _.debounce(this.setE.bind(this), 800)
            Anom.__super__.constructor.call(this, options)
        },

        initialize: function(options) {
            var no = options.model.get('number')
            if (no < 10) no = '0'+no

            var self = this
            Backbone.ajax({
                url: 'js/tables/chantler/'+no+'.json',
                dataType: 'json',
                success: function(resp) {
                    self.data = resp
                    self.plotSpectrum()
                    self.showValues()
                }
            })
        },

        onRender: function() {
            this.ui.fig.height($(window).height()*0.5)
        },

        onDomRefresh: function() {
            this.plotSpectrum()
            this.showValues()
        },


        touchStart: function(e) {
            if (e.originalEvent.touches && e.originalEvent.touches.length >  1) return
            e.preventDefault()
            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                if (this.lastClick && (new Date() - this.lastClick < 500)) {
                    this.reset(e)
                    return
                }
                this.lastClick = new Date()
            }
        },

        setE: function() {
            this.showValues()
        },


        showValues: function() {
            if (!this.data) return

            var val = parseFloat(this.ui.e.val())
            var xid = 0
            _.each(this.data[0], function(x, i) {
                if (x < val) {
                    xid = i
                }
            })

            var erange = this.data[0][xid+1] - this.data[0][xid]
            var eint = (val - this.data[0][xid])/erange

            var series = [this.ui.f2, this.ui.f1]
            _.each(series, function(s, i){
                var frange = this.data[i+1][xid+1] - this.data[i+1][xid]
                var f = this.data[i+1][xid] + (frange * eint)
                s.text(f.toFixed(2))
            }, this)

            this.plot.getOptions().grid.markings = []
            this.plot.getOptions().grid.markings.push({ xaxis: { from: val, to: val }, color: '#ccc' })
            this.plot.setupGrid();
            this.plot.draw();
        },

        reset: function(e) {
            this.zoom(e, {
                xaxis: { from: null, to: null },
                yaxis: { from: null, to: null },
            })
        },

        zoom: function(e, ranges) {
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
                    clickable: true,

                    markings: []
                },

                selection: {
                    mode: 'xy',
                },

                xaxes: [{
                    axisLabel: 'Energy (eV)',
                }],

                yaxes: [{
                    axisLabel: 'e-',
                }],
            }

            if (!this.data) return

            var max = _.max(this.model.get('edges').pluck('energy'))

            var data = [{ label: 'f\'', data: [] }, { label: 'f\'\'', data: [] }]
            _.each(this.data[0], function(x, i) {
                if (x > max*2) return
                data[1].data.push([x,this.data[1][i]])
                data[0].data.push([x,this.data[2][i]])
            }, this)

            this.plot = $.plot(this.ui.fig, data, options)
        },

	})

    return Anom

})
