(function ($){

    var Item = Backbone.Model.extend({

        defaults: function(){
            return {
                name: 'empty name',
                price: 'empty price',
                purchase_date: 'empty date',
                expiration_date: 'empty date'
            }
        }
    });

    var List = Backbone.Collection.extend({
        model: Item
    });

    var ListView = Backbone.View.extend({
        el: 'body', // attaches `this.el` to an existing element.

        events: {
            'click a#add_item': 'addItem'
        },

        initialize: function(){
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // fixes loss of context for 'this' within methods

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.render(); // not all views are self-rendering. This one is.
        },

        render: function(){
            var self = this;

            _(this.collection.models).each(function(item){ // in case collection is not empty
                self.appendItem(item);
            }, this);
        },

        addItem: function(){
            var item = new Item();

            item.set({
                name: item.get('name'), // modify item defaults
                price: item.get('price'),
                purchase_date: item.get('purchase_date'),
                expiration_date: item.get('expiration_date')
            });

            this.collection.add(item); // add item to collection; view is updated via event 'add'
        },

        appendItem: function(item){
            $(this.el).find('#item_list').append("<tr><td>" + item.get('name') + "</td>" +
                                                     "<td>" + item.get('price') + "</td>" +
                                                     "<td>" + item.get('purchase_date') + "</td>" +
                                                     "<td>" + item.get('expiration_date') + "</td></tr>");
        }

    });

    var listView = new ListView();

})(jQuery);
