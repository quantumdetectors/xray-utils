
class MuCalc {

    constructor(options) {
        this.elements = options.elements
        this.ephoton = options.ephoton || 10
    }


    // Calculate mu, abslen, absamount from
    //   formula: chemical formula string
    //   thickness: material thickness (m)
    muCalc(options) {
        var wtsum = 0
        var mu = 0

        var el_hash = this.hashFromComposition(options.formula)
        Object.keys(el_hash).forEach(function(e) {
        	var n = el_hash[e]
            // var el = this.elements.findWhere({ symbol: e })
            var el = this.elements.find(item => item.symbol == e)

            if (el) {
                var xsect = this.elementMu({ element: e })
                wtsum += n * el.atomic_mass
                mu += xsect[3] * n * el.atomic_mass
            }
        }, this)

        mu *= options.density / wtsum
        var abslen = 1/mu
        var absamount = (1 - Math.exp(-mu*(options.thickness*100)))*100

        return {
            mu: mu,
            abslen: abslen/100,
            absamount: absamount,
            energy: this.ephoton,
        }
    }


    elementMu(options) {
        // var el = this.elements.findWhere({ symbol: options.element })
        var el = this.elements.find(item => item.symbol == options.element)
        var mcm = el.mcm

        if (el) {
            var edges = el.edges

            var photo_barn = null, _lasted = null
            var lines = ['K', 'L3', 'M1']
            lines.every(function(e) {
                _lasted = e
                // var ed = edges.findWhere({ label: e })
                var ed = edges.find(item => item.label == e)
                // console.log(e, ed, mcm.get(e[0].toLowerCase()+'fit'))
                if (ed) {
                    if (this.ephoton >= ed.energy) {
                        photo_barn = this.mcMasterCalc({ fit: mcm[e[0].toLowerCase()+'fit'] })

                        if (e == 'L3') {
                            var ledges = { 'L1': 1, 'L2': 1.16, 'L3': (1.16+1.41) }
                            Object.keys(ledges).forEach(function(le) {
                            	var scale = ledges[le]
                            // ledges.forEach(function(scale, le) {
                                // var led = edges.findWhere({ label: le })
                                var led = edges.find(item => item.label == le)
                                // console.log(le, led)
                                if (led) {
                                    if (this.ephoton > led.energy) { 
                                        photo_barn /= scale
                                    }
                                }
                            }, this)
                        }

                        return false

                    } else {
                        return true
                    }
                }
            }, this)

            // console.log('last ed', _lasted)

            if (photo_barn === null) photo_barn = this.mcMasterCalc({ fit: mcm.nfit })

            var coh_barn = this.mcMasterCalc({ fit: mcm.coherent })
            var incoh_barn = this.mcMasterCalc({ fit: mcm.incoherent })

            var c = mcm.conversion
            return [coh_barn/c, incoh_barn/c, photo_barn/c, (coh_barn+incoh_barn+photo_barn)/c]
        }
    }

    mcMasterCalc(options) {
        var logE = Math.log(this.ephoton)

        var xs = 0
        options.fit.forEach(function(f,i) {
            xs += f * Math.pow(logE, i)
        })

        // console.log('mcmaster', options.fit, Math.exp(xs))
        return Math.exp(xs)
    }



    // Stolen from SynchWeb http://diamondlightsource.github.io/SynchWeb/
    // https://github.com/DiamondLightSource/SynchWeb/blob/master/client/js/modules/types/xpdf/utils/phasecompositor.js

    // Create an element-multiplicity hash from an arbitrary chemical formula string
    hashFromComposition(compositionIn) {
        var openRegexp = new RegExp(/\(/) // a single literal open bracket
        var closeRegexp = new RegExp(/\)/) // a single literal close bracket
        var bracketedRegexp = openRegexp
        var numberRegexp = new RegExp(/\d*\.?\d+/) // a positive decimal number
        
        var composition = compositionIn
        
        while (composition.search(bracketedRegexp) != -1) {
            // Get the first closing bracket
            var firstClose = composition.indexOf(')')
            // Get the last open bracket before this
            var previousOpen = composition.lastIndexOf('(', firstClose)
            // And get the multiplicity, and note the location at which the
            // formula restarts after this sub-formula
            var subformulaMultiplicity = 1.0
            var restartIndex = firstClose+1
            var formulaAfterClose =composition.substring(restartIndex) 
            // First, see if the next number starts immediately after the close bracket
            if (formulaAfterClose.search(numberRegexp) == 0) {
                // Get the matching number
                var multiplicityString = numberRegexp.exec(formulaAfterClose)
                subformulaMultiplicity = Number.parseFloat(multiplicityString)
                restartIndex += multiplicityString.length
            }
            var subFormula = composition.substring(previousOpen+1, firstClose)
            
            // create the hash of elements for the subformula
            var subHash = this.hashFromBracketlessComposition(subFormula)
            // multiply by the multiplicity
            subHash = this.weightHash(subHash, subformulaMultiplicity)
            // stringify the expanded subformula
            var expandedFormula = this.stringifyElementHash(subHash)
            // console.log(expandedFormula)
            // splice the expanded formula in to the full formula string
            var prefix = composition.substring(0, previousOpen)
            var suffix = composition.substring(restartIndex, composition.length)
            composition = prefix+expandedFormula+suffix
            
        }
        
        var finalHash = this.hashFromBracketlessComposition(composition)
        return finalHash
    }
    
    
    // Create an element-multiplicity hash from a string formula which does not
    // contain any brackets 
    hashFromBracketlessComposition(composition) {
        // tokenize the composition using a regex matcher
        var bracketlessRegexp = new RegExp(/[A-Z][a-z]?\d*\.?\d*/g) // tokenizes bracketless formulae
        var elementMultiplicityRegexp = new RegExp(/\d/) // finds a number
        var elementRegexp = new RegExp(/[A-Z][a-z]?/) // Extracts the element symbol
        var multiplicityRegexp = new RegExp(/\d+\.?\d*/) // Extracts a positive decimal number
        
        var tokens = composition.match(bracketlessRegexp)
        
        // Add '1' to the end of any tokens that do not have an explicit multiplicity
        tokens = tokens.map(function(token, index, list) {
            if (token.search(elementMultiplicityRegexp) == -1)
                return token+'1'
            else
                return token
        })
        
        // create an empty hash
        var compositionHash = tokens.reduce(function(memo, token, index) {
            var element = elementRegexp.exec(token)[0]
            var multiplicity = multiplicityRegexp.exec(token)[0]
            // add to or assign
            if (multiplicity > 0) {
                if (element in memo)
                    memo[element] += Number.parseFloat(multiplicity)
                else
                    memo[element] = Number.parseFloat(multiplicity)
            }
            return memo
        }, /*memo*/{})
        
        return compositionHash
    }
    

    // multiply the multiplicity values of a hash by a multiplier
    weightHash(elementHash, multiplier) {
    	console.log('weightHash', elementHash, multiplier)
    	Object.keys(elementHash).forEach(function(el) {
    		elementHash[el] *= multiplier
    	})

    	console.log('new', elementHash)
    	return elementHash
    }



    // Turn an element-multiplicity hash into a string
    stringifyElementHash(elementHash) {
        var keysOrder = ('C' in elementHash) ?
                Object.keys(elementHash).sort(this.compareHill.bind(this)) :
                    Object.keys(elementHash).sort()


        return keysOrder.reduce(function(memo, key) {
            var multiplicity = elementHash[key]
            if (Number.isFinite(multiplicity) && multiplicity != 0) 
                return memo+key+( (multiplicity != 1) ? multiplicity : '')
            else
                return memo
        }, '')

    }



    hillOrder(elementSymbol) {
        var hillOrdered = ['C', 'H',
           'Ac', 'Ag', 'Al', 'Am', 'Ar', 'As', 'At', 'Au',
           'B', 'Ba', 'Be', 'Bi', 'Bk', 'Br',
           'Cd', 'Ce', 'Cf', 'Cl', 'Cm', 'Co', 'Cr', 'Cs', 'Cu',
           'Dy',
           'Er', 'Es', 'Eu',
           'F', 'Fe', 'Fm', 'Fr',
           'Ga', 'Gd', 'Ge',
           'He', 'Hf', 'Hg', 'Ho',
           'I', 'In', 'Ir',
           'K',
           'La', 'Li', 'Lu',
           'Mg', 'Mn', 'Mo',
           'N', 'Na', 'Nb', 'Nd', 'Ne', 'Ni', 'Np',
           'O', 'Os',
           'P', 'Pa', 'Pb', 'Pd', 'Pm', 'Po', 'Pr', 'Pt', 'Pu',
           'Ra', 'Rb', 'Re', 'Rh', 'Rn', 'Ru',
           'S', 'Sb', 'Sc', 'Se', 'Si', 'Sm', 'Sn', 'Sr',
           'Ta', 'Tb', 'Tc', 'Te', 'Th', 'Ti', 'Tl', 'Tm',
           'U',
           'V',
           'W',
           'Xe',
           'Y', 'Yb',
           'Zn', 'Zr',
        ]
        return hillOrdered.indexOf(hillOrdered, elementSymbol)
    }

    compareHill(elementA, elementB) {
        return this.hillOrder(elementA) - this.hillOrder(elementB)
    }

}




self.addEventListener('message', function(e) {
	self.console.log('message in worker', e)

	if (e.data.ephotons) {
		var res = []
		e.data.ephotons.forEach(function(en) {
			var mc = new MuCalc({ elements: e.data.elements, ephoton: en })
			var r = mc.muCalc({ 
		        formula: e.data.formula,
		        density: e.data.density, 
		        thickness: e.data.thickness
		    })
			res.push(r)
		})

	} else {
		var mc = new MuCalc({ elements: e.data.elements, ephoton: e.data.ephoton })
		var res = mc.muCalc({ 
	        formula: e.data.formula,
	        density: e.data.density, 
	        thickness: e.data.thickness
	    })
	}

	self.postMessage(res)

})
