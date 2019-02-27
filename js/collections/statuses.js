define(['backbone', 'models/status', 'utils/kvcollection'], function(Backbone, Status, KVCollection) {

    return Backbone.Collection.extend(_.extend({}, KVCollection, {
    	model: Status,
    	
        keyAttribute: 'name',
        valueAttribute: 'acronym',

        comparator: 'name',
    }))

})
