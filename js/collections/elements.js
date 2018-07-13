define(['backbone', 'models/element', 'utils/kvcollection'], function(Backbone, Element, KVCollection) {

    return Backbone.Collection.extend(_.extend({}, KVCollection, {
    	model: Element,
    	
        keyAttribute: 'element',
        valueAttribute: 'element',
    }))

})
