$(document).ready(function() {
	$('#staff-picks li').hover(function() {
		$(this).children().each(function(i, e) {
			$(e).addClass('show');
		});
	}, function() {
		$(this).children().removeClass('show');
	});

	$('#staff-picks li').click(function() {
		window.location.href = $(this).attr('data');
	});
});