import videoUpload from './actions/videoupload.js';
import videoPlay from './actions/videoplay.js';
const $vidForm = $('#vidForm'),
	$tableBody = $('#tableBody');
	
window.onload = (function() {
	$vidForm.on(
		'submit',
		videoUpload.bind(null, $vidForm, $tableBody)
	);
	$tableBody.on('click', videoPlay);
})();
