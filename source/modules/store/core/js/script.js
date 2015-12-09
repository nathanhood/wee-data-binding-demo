Wee.fn.make('store', {
	init: function() {
		this.$private.createApp();
		this.$private.addViewHelpers();
		this.$private.bindEvents();
	}
}, {
	_construct: function() {
		this.tax = 0.0925;
	},
	createApp: function() {
		Wee.data.request({
			scope: this,
			url: '/cart.json',
			json: true,
			success: function(data) {
				this.app = Wee.app.make('cart', {
					view: 'store.cart',
					target: 'ref:cart',
					model: data
				});
			}
		});
	},
	addViewHelpers: function() {
		var scope = this;

		Wee.view.addHelper({
			currencyFormat: function() {
				return '$' + this.val.toFixed(2);
			},
			subtotal: function() {
				return this.val.reduce(function(total, item) {
					return total + (item.price * item.qty);
				}, 0);
			},
			tax: function() {
				return this.val.reduce(function(total, item) {
					return total + (item.price * item.qty * scope.tax);
				}, 0);
			},
			total: function() {
				return this.val.reduce(function(total, item) {
					var itemTotal = item.price * item.qty;

					return total + itemTotal + (itemTotal * scope.tax);
				}, 0);
			}
		});
	},
	removeItem: function(id) {
		this.app.$drop('items.' + id);
	},
	updateItemQuantity: function(id, qty) {
		this.app.$set('items.' + id + '.qty', parseInt(qty));
	},
	bindEvents: function() {
		var scope = this;

		Wee.events.on({
			'ref:removeItem': {
				click: function() {
					scope.removeItem($(this).data('id'));
				}
			},
			'ref:itemQty': {
				input: function() {
					var $el = $(this);

					scope.updateItemQuantity($el.data('id'), $el.val());
				}
			}
		}, {
			delegate: 'ref:cart'
		});
	}
});