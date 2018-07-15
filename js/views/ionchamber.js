define(['backbone.marionette',
    'utils/mucalc',
    'models/material',
    'collections/materials',
    'json!tables/materials.json',
    'tpl!templates/ionchamber.html'], function(Marionette, 
    MuCalc,
    Material, Materials, materials,
    template) {


    return Marionette.View.extend({
        template: template,

        ui: {
            g1p: 'input[name=gas1prop]',
            g2p: 'input[name=gas2prop]',
            g1: 'select[name=gas1]',
            g2: 'select[name=gas2]',
            pressure: 'input[name=pressure]',
            energy: 'input[name=energy]',
            voltage: 'input[name=voltage]',
            iclength: 'input[name=iclength]',
            gain: 'input[name=gain]',
            result: '.result',
        },

        events: {
            'change @ui.g1p': 'updateGas2',
            'change @ui.g2p': 'updateGas1',
            'change @ui.g1': 'calculateIC',
            'change @ui.g2': 'calculateIC',
            'change @ui.pressure': 'calculateIC',
            'change @ui.energy': 'calculateIC',
            'change @ui.voltage': 'calculateIC',
            'change @ui.iclength': 'calculateIC',
            'change @ui.gain': 'calculateIC',
        },

        initialize: function(options) {
            var tm = new Materials(materials)
            this.materials = new Materials(tm.filter(function(m) { return m.get('ip') }))
        },

        updateGas1: function() {
            this.ui.g1p.val(100-this.ui.g2p.val())
            this.calculateIC()
        },

        updateGas2: function() {
            this.ui.g2p.val(100-this.ui.g1p.val())
            this.calculateIC()
        },


        onRender: function() {
            this.ui.g1.html(this.materials.opts())
            this.ui.g2.html(this.materials.opts())

            this.calculateIC()
        },

        calculateIC: function() {
            console.log('calc', !this.ui.energy.val(), !this.ui.pressure.val(), !this.ui.voltage.val(), !this.ui.iclength.val())
            if (!this.ui.energy.val() || !this.ui.pressure.val() || !this.ui.voltage.val() || !this.ui.iclength.val()) return

            var g1 = this.materials.findWhere({ name: this.ui.g1.val() })
            var g2 = this.materials.findWhere({ name: this.ui.g2.val() })

            var formula = '('+g1.get('formula')+')'+(this.ui.g1p.val()/100)+'('+g2.get('formula')+')'+(this.ui.g2p.val()/100)
            var density = (this.ui.g1p.val()/100*this.ui.pressure.val()/760*g1.get('density')) + (this.ui.g2p.val()/100*this.ui.pressure.val()/760*g2.get('density'))

            var mat = new Material({ formula: formula, density: density, thickness: this.ui.iclength.val()/100 })
            var mup = mat.calcMu({ energy: this.ui.energy.val(), set: true })

            var self = this
            mup.then(function() {
                var mu = mat.get('absorption')
                console.log(formula, density, mu)

                var ioneV = self.ui.g1p.val()/100*g1.get('ip') + self.ui.g2p.val()/100*g2.get('ip')
                var flux = (self.ui.voltage.val()*ioneV)/(Math.pow(10, 1*self.ui.gain.val())*1.6e-19*self.ui.energy.val()*1000*mu.absamount/100)
                console.log(ioneV, flux)

                self.ui.result.text(flux.toExponential(6))
            })
        },
    })


})
