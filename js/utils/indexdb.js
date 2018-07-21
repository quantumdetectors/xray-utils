define(['backbone.marionette', 'utils/idb-promised'], function(Marionette) {

    return Marionette.Object.extend({
        stores: ['materials'],

        initialize: function() {
            this.dbpromise = this.createIndexedDB()
        },


        createIndexedDB: function() {
            if (!('indexedDB' in window)) {return null}
            return idb.open('xray-utils', 1, function(upgradeDb) {
                if (!upgradeDb.objectStoreNames.contains('materials')) {
                    var eventsOS = upgradeDb.createObjectStore('materials', {keyPath: 'name'})
                }
            })
        },


        save: function(options) {
            console.log('saving', options)
            if (!('indexedDB' in window)) {return null}
            var self = this
            return this.dbpromise.then(function(db) {
                return self.get({ store: options.store }).then(function(current) {
                    var tx = db.transaction(options.store, 'readwrite');
                    var store = tx.objectStore(options.store);

                    var toAdd = options.objects.filter(function(obj) {
                        return !current.some(function(obj2) {
                            return obj.name == obj2.name && obj.formula == obj2.formula
                        })
                    })

                    var toRem = current.filter(function(obj) {
                        return !options.objects.some(function(obj2) {
                            return obj.name == obj2.name && obj.formula == obj2.formula
                        })
                    })

                    var add = toAdd.map(function(obj) { store.put(obj) })
                    var rem = toRem.map(function(obj) { store.delete(obj.name) })
                    var all = add.concat(rem)

                    return Promise.all(all)
                    .catch(function() {
                        tx.abort()
                        throw Error('Objects were not synchronised to the store: '+options.store)
                    })

                })
            })
        },


        get: function(options) {
            if (!('indexedDB' in window)) {return null}
            return this.dbpromise.then(function(db) {
                var tx = db.transaction(options.store, 'readonly');
                var store = tx.objectStore(options.store);
                return store.getAll();
            })
        }

    })

})
