$(document).ready(function() {
	$('#login-button').click(function(e) {
		console.log('I GOT CLICKED SOMEONE HELP');

		var user = {};
		$('#login-container input').each(function(i, e) {
			user[$(e).attr('name')] = $(e).val();
		});

		$.ajax({
			type: 'POST',
			url: '/api/processLogin',
			data: user,
			success: function(data) {
				user.password = null;
				delete user.password;

				if (data.success) {
					console.log(data.info);
					window.location.href = '/';
				}
			}
		});
	});
});