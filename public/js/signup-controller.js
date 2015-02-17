$(document).ready(function() {
	$('#signup-button').click(function(e) {
		console.log('I GOT CLICKED SOMEONE HELP');

		var newUser = {};
		$('#signup-container input').each(function(i, e) {
			newUser[$(e).attr('name')] = $(e).val();
		});
		
		if (newUser.password === newUser.repeatPassword) {
			newUser.repeatPassword = null;
			delete newUser.repeatPassword;

			$.ajax({
				type: 'POST',
				url: '/api/processSignup',
				data: newUser,
				success: function(data) {
					newUser.password = null;
					delete newUser.password;
					window.location.href = '/';
				}
			});
		}
		else {
			// THROW A BIG FAT ERROR
		}
	});
});