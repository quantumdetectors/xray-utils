define(['backbone', 'models/material', 'utils/kvcollection'], function(Backbone, Material, KVCollection) {

    return Backbone.Collection.extend(_.extend({}, KVCollection, {
        model: Material,

        comparator: 'name',
        
        keyAttribute: 'name',
        valueAttribute: 'name',
    }))

})
