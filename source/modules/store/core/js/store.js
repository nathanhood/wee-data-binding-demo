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
		this.app = Wee.app.make('cart', {
			view: 'store.cart',
			target: 'ref:cart',
			model: {
				items: [
					{
						name: 'T-shirt',
						qty: 1,
						price: 15,
						sku: '32u3294'
					},
					{
						name: 'Hat',
						qty: 2,
						price: 8,
						sku: '98sd8s9'
					},
					{
						name: 'Coat',
						qty: 1,
						price: 60,
						sku: 'sdsd09890'
					},
					{
						name: 'Stockings',
						qty: 2,
						price: 6,
						sku: '8sfs98s'
					}
				]
			}
		});
	},
	addViewHelpers: function() {
		var scope = this;

		Wee.view.addHelper({
			currencyFormat: function() {
				return this.val.toFixed(2);
			},
			subtotal: function() {
				var subtotal = 0;

				this.data.items.forEach(function(item) {
					subtotal += item.price * item.qty;
				});

				return subtotal.toFixed(2);
			},
			tax: function() {
				var tax = 0;

				this.data.items.forEach(function(item) {
					tax += item.price * item.qty * scope.tax;
				});

				return tax.toFixed(2);
			},
			total: function() {
				var total = 0;

				this.data.items.forEach(function(item) {
					var itemTotal = item.price * item.qty;

					total += itemTotal + (itemTotal * scope.tax);
				});

				return total.toFixed(2);
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

		$('ref:removeItem').on('click', function() {
			scope.removeItem($(this).data('id'));
		});

		$('ref:itemQty').on('change', function() {
			var $el = $(this);

			scope.updateItemQuantity($el.data('id'), $el.val());
		});
	}
});