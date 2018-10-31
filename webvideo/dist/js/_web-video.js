//var videoPlay = require('./actions/videoplay');
//var videoUpload = require('./actions/videoupload');
	
/**
* Performs the initial loading of the page
**/	
function bootstrap() {
	var vidForm = document.getElementById('vidForm');
	var tableBody = document.getElementById('tableBody');
	
	vidForm.addEventListener(
		'submit',
		videoUpload.bind(null, vidForm, tableBody)
	);
	tableBody.addEventListener('click', videoPlay);
}
	
window.onload = bootstrap();
;function timeFormat(timeInSeconds) {
	var reminderAfterHours = timeInSeconds % 3600,
		hours = Math.round((timeInSeconds - reminderAfterHours) / 3600),
		reminderAfterMinutes = reminderAfterHours % 60,
		minutes = Math.round((reminderAfterHours - reminderAfterMinutes) / 60),
		seconds = Math.round(reminderAfterMinutes);
		
	minutes = ('00' + minutes).slice(-2);
	seconds = ('00' + seconds).slice(-2);
	return hours + ':' + minutes + ':' + seconds;
}

function playerInitialize(startButton, progressBar) {
	startButton.innerHTML = 'Start';
	startButton.classList.remove('btn-success', 'btn-warning', 'btn-danger');
	startButton.classList.add('btn-success');
	progressBar.setAttribute('style', 'width: 0%; color: #f00;');
	progressBar.innerHTML = '0:00:00';
}
	
function timeupdateHandler(video, progressBar) {
	var currentTimeOfVideo = video.currentTime;
	var durationOfVideo = video.duration;
	
	progressBar.setAttribute('style', 'width: ' + Math.round(100 * currentTimeOfVideo / durationOfVideo) + '%; color: #f00;');
	progressBar.innerHTML = timeFormat(currentTimeOfVideo);
}

function endedHandler(startButton, progressBar, video) {
	playerInitialize(startButton, progressBar);
	video.fastSeek(0);
}

function videoInialize(startButton) {
	var progressBarElem = startButton
		.parentElement.parentElement
		.getElementsByClassName('play-progress-bar')[0];
	var videoElem = startButton
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
	var htmlOfButton = startButton.innerHTML;
	var videoElem = startButton
		.parentElement.parentElement
		.getElementsByTagName('video')[0];
	var durationOfVideo = videoElem.duration;
		
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

//export default videoPlay;
;//var _ = require('lodash');
var rowTemplate = document.getElementById('rowTemplate');
var rowTemplateFunc = _.template(rowTemplate.innerHTML);
var currentRowNumber = 1;
	
/**
* Increments the row number in the videomovie table and returns the current number
* @return {integer} the current row number
**/	
function incrementRowNumber() {
	return currentRowNumber++;
}
	
/**
* Uploads a videomovie to the videomovie table
* @param {Object} vidForm is the videomovie input form
* @param {Object} tableBody is the body of the videomovie table
* @param {Object} event is the 'submit' event of the videomovie input form
**/	
function videoUpload(vidForm, tableBody, event) {
	var files = event.target[0].files;
	var	resetVidFormEvent = null;
	
	for (var i = 0; i < files.length; i++) {
		tableBody.insertAdjacentHTML('beforeEnd',
			rowTemplateFunc({
				indexOfRow: incrementRowNumber(),
				blob: window.URL.createObjectURL(files[i]),
				filename: files[i].name
			})
		);
	}
	
	event.preventDefault();
	
	resetVidFormEvent = document.createEvent('HTMLEvents');
	resetVidFormEvent.initEvent('reset', false, true);
	vidForm.dispatchEvent(resetVidFormEvent);
}

//export default videoUpload;
