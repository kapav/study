window.onload = (function() {
	'use strict';
	var vidForm = document.forms.vidForm,
		vidInput = vidForm[0],
		vidSubmit = vidForm[1],
		folder = "video/",
		$tableLayout = $("#tableLayout"),
		rowTemplateFunc = _.template($('#rowTemplate').html());
		
	function tableHandler(event) {
		var $target = $(event.target),
			html = $target.html(),
			$video = $target.closest('tr').find('video');
		
		if ($target.hasClass('play-button')) {
			$target.toggleClass('btn-success btn-warning');
			$target.html(html === 'Start' ? 'Pause' : 'Start');
			
			if (!$video[0].error) {
				if ($video[0].paused) {
					$video[0].play();
				} else {
					$video[0].pause();
				}
			}
		}
	}

		$tableLayout.append(
		rowTemplateFunc({
			indexOfRow: 100,
			folder: folder,
			filename: 'MP4_big_buck_bunny.mp4'
		})
	);
	
	$.ajax({
		url: folder,
		success: function (data) {
			$(data).find('a').attr('href', function(indexOfRow, filename) {
				var html = rowTemplateFunc({
					indexOfRow: indexOfRow,
					folder: folder,
					filename: filename
				});
				$tableLayout.append(html);
			});
		}
	});
	
	$tableLayout.on('click', tableHandler);
})();