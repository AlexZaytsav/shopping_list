(function ($){

//    var Item = Backbone.Model.extend({
//
//        defaults: function(){
//            return {
//                name: 'empty name',
//                price: 'empty price',
//                purchase_date: 'empty date',
//                expiration_date: 'empty date'
//            }
//        },
//
//        toggle: function() {
//            this.save();
//        }
//    });

    var ItemView = Backbone.View.extend({
        el: 'body', // attaches `this.el` to an existing element.

        events: {
            'click a#add_item': 'addItem'
        },

        initialize: function(){
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.render(); // not all views are self-rendering. This one is.
        },

        render: function(){
            $(this.el).find('#item_list').append("<ul> <li>hello world</li> </ul>");
        },

        addItem: function(){
            $(this.el).find('#item_list').append("<ul> <li>hello world</li></ul>");
        }
    });

    var itemView = new ItemView();

})(jQuery);
