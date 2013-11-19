(function ($) {

    define("items-backbone", ["localstorage"], function() {
        var SomeCollection = Backbone.Collection.extend({
            localStorage: new Backbone.LocalStorage("items-backbone") // Unique name within your app.
        });

        return new SomeCollection();
    });

    require(["items-backbone"], function(someCollection) {
        // ready to use someCollection
    });


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
        model: Item//,

        //localStorage: new Backbone.LocalStorage("items-backbone")

    });

    var ItemView = Backbone.View.extend({

        tagName: 'tr', // name of (orphan) root tag in this.el

        events: {
            'click a.delete': 'remove'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'unrender', 'remove'); // every function that uses 'this' as the current object should be in here

            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },

        render: function () {
            $(this.el).html("<td>" + this.model.get('name') + "</td>" +
                "<td>" + this.model.get('price') + "</td>" +
                "<td>" + jQuery.timeago(this.model.get('purchase_date')) + "</td>" +
                "<td>" + this.model.get('expiration_date') + "</td>"+
                "<td><a href='#' class='delete'><i class='fa fa-trash-o fa-2'></i></a></td>");
            return this; // for chainable calls, like .render().el
        },

        unrender: function(){
            $(this.el).remove();
        },

        remove: function(){
            this.model.destroy();
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
                purchase_date: new Date(),
                expiration_date: item.get('expiration_date')
            });

            this.collection.add(item); // add item to collection; view is updated via event 'add'
        },

        appendItem: function (item) {
            var itemView = new ItemView({
                model: item
            });

            $(this.el).find('#item_list').append(itemView.render().el)
        }


    });

    var listView = new ListView();

})(jQuery);
