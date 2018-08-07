define(['backbone', 'models/status', 'utils/kvcollection'], function(Backbone, Status, KVCollection) {

    return Backbone.Collection.extend(_.extend({}, KVCollection, {
    	model: Status,
    	
        keyAttribute: 'facility',
        valueAttribute: 'facility',

        comparator: 'facility',
    }))

})
