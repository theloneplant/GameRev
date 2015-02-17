$(document).ready(function() {
	$('#logout-button').click(function(e) {
		console.log('you like that dont you');

		$.ajax({
			type: 'POST',
			url: '/api/processLogout',
			data: {},
			success: function(data) {
				if (data.success) {
					window.location.href = '/';
				}
			}
		});
	});
});