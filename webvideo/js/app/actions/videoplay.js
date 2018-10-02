import $ from 'jquery';

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

function playerInitialize(startButton, progressBar) {
	startButton.innerHTML = 'Start';
	startButton.classList.remove('btn-success', 'btn-warning', 'btn-danger');
	startButton.classList.add('btn-success');
	progressBar.setAttribute('style', 'width: 0%; color: #f00;');
	progressBar.innerHTML = '0:00:00';
}
	
function timeupdateHandler(video, progressBar) {
	const currentTimeOfVideo = video.currentTime;
	const durationOfVideo = video.duration;
	
	progressBar.setAttribute('style', `width: ${Math.round(100 * currentTimeOfVideo / durationOfVideo)}%; color: #f00;`);
	progressBar.innerHTML = timeFormat(currentTimeOfVideo);
}

function endedHandler(startButton, progressBar, video) {
	playerInitialize(startButton, progressBar);
	video.fastSeek(0);
}

function videoInialize(startButton) {
	const progressBarElem = startButton
		.parentElement.parentElement
		.getElementsByClassName('play-progress-bar')[0];
	const videoElem = startButton
		.parentElement.parentElement
		.getElementsByTagName('video')[0];
	
	playerInitialize(startButton, progressBarElem);
	videoElem.removeEventListener('timeupdate', timeupdateHandler);
	videoElem.addEventListener('timeupdate',
			timeupdateHandler.bind(null, videoElem, progressBarElem));
	videoElem.removeEventListener('ended', endedHandler);
	videoElem.addEventListener('ended',
			endedHandler.bind(null, startButton, progressBarElem, videoElem));
}

function startHandler(startButton) {
	const htmlOfButton = startButton.innerHTML;
	const videoElem = startButton
		.parentElement.parentElement
		.getElementsByTagName('video')[0];
	const durationOfVideo = videoElem.duration;
		
	if (!videoElem.error) {
		if (videoElem.paused) {
			startButton.classList.remove('btn-success', 'btn-warning', 'btn-danger');
			startButton.classList.add('btn-danger');
			startButton.innerHTML = 'Pause';
			videoElem.play();
		} else {
			startButton.classList.remove('btn-success', 'btn-warning', 'btn-danger');
			startButton.classList.add('btn-warning');
			startButton.innerHTML = 'Resume';
			videoElem.pause();
		}
	}
}
	
function videoPlay(event) {
	var target = event.target;
	
	if (target.classList.contains('play-button')) {
		videoInialize(target);
		startHandler(target);
	}
}

export default videoPlay;
