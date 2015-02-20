$(document).ready(function() {
	console.log("IM A CONTAINER");

	// Initialize editor with custom theme and modules
	var fullEditor = new Quill('#editor', {
	  modules: {
	    'toolbar': { container: '#toolbar' },
	    'link-tooltip': true
	  },
	  theme: 'snow'
	});

	$('#publish-button').click(function(e) {
		var reviewJSON = {
			game: $('select[name=game]').val(),
			newReview: {
				title: $('input[name=title]').val(),
				reviewBody: fullEditor.getHTML(),
				tldr: $('textarea[name=tldr]').val(),
				rating: $('input[name=rating]:checked').val(),
				likes: 0,
				bannerImage: null
			}
		}

		console.log(reviewJSON);
		
		$.ajax({
			type: 'POST',
			url: '/api/addReview',
			data: reviewJSON,
			success: function(data) {
				console.log(data);
				history.go(-1);
				window.location.reload();
			}
		});
	});
});