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
        el: $('#item_list'), // attaches `this.el` to an existing element.

        events: {
            'click a#add_item': 'addItem'
        },

        initialize: function(){
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.counter = 0; // total number of items added thus far

            this.render(); // not all views are self-rendering. This one is.
        },

        render: function(){
            $(this.el).append("<ul> <li>hello world</li> </ul>");
        },

        addItem: function(){
            alert(this.counter);
            this.counter++;
            $(this.el).append("<ul> <li>hello world"+this.counter+"</li></ul>");
        }
    });

    var itemView = new ItemView();

})(jQuery);
