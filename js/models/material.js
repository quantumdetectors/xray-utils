define(['backbone', 'json!tables/elements.json'], function(Backbone, elements) {

	return Backbone.Model.extend({
        idAttribute: 'name',

        defaults: {
            formula_formatted: '',
            custom: false
        },

        initialize: function(attrs, options) {
            this.listenTo(this, 'change:formula', this.formatFormula)
            this.formatFormula()
        },

        formatFormula: function() {
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

            var model = this
            return new Promise(function(resolve) {
                var w = new Worker('js/worker.js')
                w.postMessage({
                    elements: elements,
                    ephoton: options.energy,
                    ephotons: options.energies,
                    formula: model.get('formula'), 
                    density: model.get('density'), 
                    thickness: model.get('thickness')
                })
                w.onmessage = function(event){
                    console.log('message from worker', event)
                    if (options.set) model.set({ absorption: event.data })
                    resolve(event.data)
                    w.terminate()
                }
            })
        },

    })

})
