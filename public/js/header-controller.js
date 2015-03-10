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

	$('#header-create-review-btn, #create-review-btn, #modal-overlay, #modal-close').click(function() {
		var elementHref = $(this).parent().attr('href') || $(this).attr('href') || '';
		if (elementHref.length === 0) {
			toggleReviewModal();
		}
	});

	$('#game-search').on('input', function() {
		var search = document.getElementById('game-search').value;
		$('#modal-window li').each(function(i, e) {
			if ($(e).text().toLowerCase().indexOf(search.toLowerCase()) > -1) {
				console.log($(e).text());
				$(e).css({
					'display': 'block'
				});
			}
			else {
				$(e).css({
					'display': 'none'
				});
			}
		});
	});

	var modalShow = false;
	var toggleReviewModal = function() {
		if (!modalShow) {
			$('#modal-overlay').css({
				'display': 'block'
			});
			$('#modal-window').css({
				'display': 'block'
			});

			setTimeout(function() {
				$('#modal-overlay').addClass('show');
				$('#modal-window').addClass('show');
			},10);

			//$('#game-search').focus();

			modalShow = true;
		}
		else {
			$('#modal-overlay').removeClass('show');
			$('#modal-window').removeClass('show');

			setTimeout(function() {
				$('#modal-overlay').css({
					'display': 'none'
				});
				$('#modal-window').css({
					'display': 'none'
				});
			},160); // 10ms + animation time

			modalShow = false;
		}
	};
});