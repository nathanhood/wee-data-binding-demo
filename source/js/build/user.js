Wee.fn.make('user', {
	init: function() {
		$('ref:login').on('click', function() {
			$.set('user.loggedIn', true);
		});
	}
});