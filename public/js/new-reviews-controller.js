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

	/*
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
			
			$(this).parent().remove();
			e.preventDefault();
			$(this).parent().parent().children().last().children().focus();
		}
	});
	*/

	$('#publish-button').click(function(e) {
		var good = '', okay = '', bad = '';

		$('#the-good ul li').each(function(i, e) {
			good += $(this).children().val() + '\t';
		});

		$('#the-okay ul li').each(function(i, e) {
			okay += $(this).children().val() + '\t';
		});

		$('#the-bad ul li').each(function(i, e) {
			bad += $(this).children().val() + '\t';
		});

		var reviewJSON = {
			game: $('#hidden-game-title').text(),
			newReview: {
				title: $('input[name=title]').val(),
				reviewBody: fullEditor.getHTML(),
				theGood: good,
				theOkay: okay,
				theBad: bad,
				rating: $('input[name=rating]:checked').val(),
				likes: 0,
				bannerImage: $('#hidden-game-banner').text()
			}
		}

		console.log(reviewJSON);
		
		$.ajax({
			type: 'POST',
			url: '/api/addReview',
			data: reviewJSON,
			success: function(data) {
				console.log(data);
				window.location.href = '/';
			}
		});
	});
});