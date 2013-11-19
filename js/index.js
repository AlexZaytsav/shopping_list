(function ($) {

    var Item = Backbone.Model.extend({

        defaults: function () {
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

    var ItemView = Backbone.View.extend({

        el: 'body', // name of (orphan) root tag in this.el

        initialize: function () {
            _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
        },
        render: function () {
            $(this.el).find('#item_list').append("<tr><td>" + this.model.get('name') + "</td>" +
                "<td>" + this.model.get('price') + "</td>" +
                "<td>" + this.model.get('purchase_date') + "</td>" +
                "<td>" + this.model.get('expiration_date') + "</td></tr>");
            return this; // for chainable calls, like .render().el
        }
    });

    var ListView = Backbone.View.extend({
        el: 'body', // attaches `this.el` to an existing element.

        events: {
            'click a#add_item': 'addItem'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // fixes loss of context for 'this' within methods

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.render(); // not all views are self-rendering. This one is.
        },

        render: function () {
            var self = this;

            _(this.collection.models).each(function (item) { // in case collection is not empty
                self.appendItem(item);
            }, this);
        },

        addItem: function () {
            var item = new Item();

            item.set({
                name: item.get('name'), // modify item defaults
                price: item.get('price'),
                purchase_date: item.get('purchase_date'),
                expiration_date: item.get('expiration_date')
            });

            this.collection.add(item); // add item to collection; view is updated via event 'add'
        },

        appendItem: function (item) {
            var itemView = new ItemView({
                model: item
            });

            $(this.el).append(itemView.render().el)
        }


    });

    var listView = new ListView();

})(jQuery);
