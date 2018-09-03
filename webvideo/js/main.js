window.onload = (function() {
	'use strict';
	var vidForm = document.forms.vidForm,
		vidInput = vidForm[0],
		vidSubmit = vidForm[1],
		folder = "video/",
		$tableLayout = $("#tableLayout"),
		rowTemplateFunc = _.template($('#rowTemplate').html());
		
	function timeFormat(timeInSeconds) {
		var reminderAfterHours = timeInSeconds % 3600,
			hours = Math.round((timeInSeconds - reminderAfterHours) / 3600),
			reminderAfterMinutes = reminderAfterHours % 60,
			minutes = Math.round((reminderAfterHours - reminderAfterMinutes) / 60),
			seconds = Math.round(reminderAfterMinutes);
			
		minutes = ('00' + minutes).slice(-2);
		seconds = ('00' + seconds).slice(-2);
		return `${hours}:${minutes}:${seconds}`;
	}
		
	function timeupdateInialize($elem) {
		$elem.attr('style', 'width: 0%; color: #f00;');
	}
	
	function timeupdateHandler($video, $progressBar) {
		var currentTimeOfVideo = $video[0].currentTime;
		
		$progressBar.attr('style', `width: ${Math.round(100 * currentTimeOfVideo / $video[0].duration)}%; color: #f00;`);
		$progressBar.html(timeFormat(currentTimeOfVideo));
	}
		
	function tableHandler(event) {
		var $target = $(event.target),
			htmlOfButton = null,
			$video = null,
			durationOfVideo = null,
			$progressBar = null;
		
		if ($target.hasClass('play-button')) {
			htmlOfButton = $target.html();
			$video = $target.closest('tr').find('video');
			durationOfVideo = $video.duration;
			$progressBar = $target.closest('tr').find('.play-progress-bar');
			
			timeupdateInialize($progressBar);
			$target.toggleClass('btn-success btn-warning');
			$target.html(htmlOfButton === 'Start' ? 'Pause' : 'Start');
			
			if (!$video[0].error) {
				if ($video[0].paused) {
					$video[0].play();
				} else {
					$video[0].pause();
				}
			}
			
			$video.on('timeupdate', timeupdateHandler.bind(null, $video, $progressBar));
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