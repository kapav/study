window.onload = (function() {
	'use strict';
	var $tableLayout = $("#tableLayout");
	
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
	
	function playerInitialize($startButton, $progressBar) {
		$startButton.html('Start');
		$startButton
			.removeClass('btn-success btn-warning btn-danger')
			.addClass('btn-success');
		$progressBar.attr('style', 'width: 0%; color: #f00;');
		$progressBar.html('0:00:00');
	}
		
	function timeupdateHandler($video, $progressBar) {
		var currentTimeOfVideo = $video[0].currentTime;
		
		$progressBar.attr('style', `width: ${Math.round(100 * currentTimeOfVideo / $video[0].duration)}%; color: #f00;`);
		$progressBar.html(timeFormat(currentTimeOfVideo));
	}
	
	function endedHandler($startButton, $progressBar, $video) {
		playerInitialize($startButton, $progressBar);
		$video[0].fastSeek(0);
	}
	
	function videoInialize($startButton) {
		var $progressBar = $startButton.closest('tr').find('.play-progress-bar'),
			$video = $startButton.closest('tr').find('video');
		
		playerInitialize($startButton, $progressBar);
		$video
			.off('timeupdate')
			.on('timeupdate', timeupdateHandler.bind(null, $video, $progressBar))
			.off('ended')
			.on('ended', endedHandler.bind(null, $startButton, $progressBar, $video));
	}
	
	function startHandler($startButton) {
		var	htmlOfButton = $startButton.html(),
			$video = $startButton.closest('tr').find('video'),
			durationOfVideo = $video.duration,
			startPositionFlag = true;
			
		if (!$video[0].error) {
			if ($video[0].paused) {
				if (startPositionFlag)
				$startButton
					.removeClass('btn-success btn-warning btn-danger')
					.addClass('btn-danger');
				$startButton.html('Pause');
				$video[0].play();
			} else {
				$startButton
					.removeClass('btn-success btn-warning btn-danger')
					.addClass('btn-warning');
				$startButton.html('Resume');
				$video[0].pause();
			}
		}
	}
		
	function tableHandler(event) {
		var $target = $(event.target);
		
		if ($target.hasClass('play-button')) {
			videoInialize($target);
			startHandler($target);
		}
	}

	$tableLayout.on('click', tableHandler);
})();