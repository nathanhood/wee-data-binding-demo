Wee.fn.make('checkout', {
	init: function() {
		$.observe('user.loggedIn', 'store', {
			value: true
		});
	}
});