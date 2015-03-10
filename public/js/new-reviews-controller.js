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

	$('#summary ul').on('keydown', 'li input', function (e) {
		var hasEmpty = false;
		$(this).parent().parent().children().each(function (i, e) {
			if ($(e).children().val() === '') {
				hasEmpty = true;
			}
		});

		console.log(e.which);

		if (!hasEmpty && e.which === 13 && $(this).val() !== '') {
			console.log($(this).val());
			$(this).parent().after('<li><input type="text"></li>');
			$(this).parent().parent().children().last().children().focus();
		}
		else if (e.which === 8 && $(this).val() === '') {
			$(this).parent().parent().children().last().children().focus();
			$(this).parent().remove();
			e.preventDefault();
		}
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
				bannerImage: $('#review-banner').css('background-image')
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