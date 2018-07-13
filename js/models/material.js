define(['backbone', 'utils/mucalc'], function(Backbone, MuCalc) {

	return Backbone.Model.extend({

        initialize: function(attrs, options) {
            this.set({ formula_formatted: this.subscriptifyNumbers(this.get('formula')) })
        },


        subscriptifyNumbers: function(input) {
            if (!input) return
            return input.
                replace(/0/g, '₀').replace(/1/g, '₁').
                replace(/2/g, '₂').replace(/3/g, '₃').
                replace(/4/g, '₄').replace(/5/g, '₅').
                replace(/6/g, '₆').replace(/7/g, '₇').
                replace(/8/g, '₈').replace(/9/g, '₉')
        },


        calcMu: function(options) {
        	if (options.thickness) this.set({ thickness: options.thickness }, { silent: true })

        	var mc = new MuCalc({ ephoton: options.energy })
            var res = mc.muCalc({ 
                formula: this.get('formula'), 
                density: this.get('density'), 
                thickness: this.get('thickness')
            })
            // console.log(res)
            if (options.set) this.set({ absorption: res })
        	return res
        },

    })

})
