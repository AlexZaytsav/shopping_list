(function ($) {

    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Не',
        dateFormat: 'yy/mm/dd',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $("#purchase_date").datepicker({
        defaultDate: new Date(),
        maxDate: new Date()
    });


    var Item = Backbone.Model.extend({

        defaults: function () {
            return {
                name: 'empty name',
                price: 'empty price',
                purchase_date: 'empty date',
                expiration_date: '0'
            }
        }
    });

    var ItemView = Backbone.View.extend({

        tagName: 'tr', // name of (orphan) root tag in this.el

        events: {
            'click a.edit': 'edit',
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
                "<td>" + this.model.get('expiration_date') + "</td>" +
                "<td><a href='#' class='edit'><i class='fa fa-pencil-square-o fa-2'></i></a>" +
                "<a href='#' class='delete'><i class='fa fa-trash-o fa-2'></i></a></td>");
            return this; // for chainable calls, like .render().el
        },

        unrender: function () {
            $(this.el).remove();
        },

        remove: function () {
            this.model.destroy();
        },

        edit: function () {
            for (attr in this.model.attributes) {
                $('#' + attr).val(this.model.attributes[attr]);
                console.log(attr);
            }
        }
    });

    var List = Backbone.Collection.extend({
        model: Item,
        localStorage: new Backbone.LocalStorage("items-backbone")
    });

    var ListView = Backbone.View.extend({
        el: 'body', // attaches `this.el` to an existing element.

        events: {
            'click a#add_item': 'addItem',
            'click a#save_item': 'saveItem'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'saveItem', 'appendItem'); // fixes loss of context for 'this' within methods

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder
            this.collection.fetch();

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

            for (attr in item.attributes) {
                $('#' + attr).val(item.attributes[attr]);
            }

        },

        saveItem: function () {
            if (this.collection.get($('#id').val()))
                var item = this.collection.get($('#id').val());
            else
                var item = new Item();

            item.set({
                name: $('#name').val(), // modify item defaults
                price: $('#price').val(),
                purchase_date: $('#purchase_date').val(),
                expiration_date: $('#expiration_date').val()
            });

            this.collection.add(item);
            item.save();
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
