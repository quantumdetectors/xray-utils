define(['backbone', 'utils/kvcollection'], function(Backbone, KVCollection) {

    return Backbone.Collection.extend(_.extend({}, KVCollection, {
        keyAttribute: 'facility',
        valueAttribute: 'facility',

        comparator: 'facility',
    }))

})