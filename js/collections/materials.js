define(['backbone', 'models/material', 'utils/kvcollection'], function(Backbone, Material, KVCollection) {

    return Backbone.Collection.extend(_.extend({}, KVCollection, {
        model: Material,

        keyAttribute: 'name',
        valueAttribute: 'name',
    }))

})
