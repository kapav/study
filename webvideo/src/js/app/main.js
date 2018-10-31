//var videoPlay = require('./actions/videoplay');
//var videoUpload = require('./actions/videoupload');

import videoUpload from './actions/videoupload';
import videoPlay from './actions/videoplay';
	
/**
* Performs the initial loading of the page
**/	
function bootstrap() {
	var vidForm = document.getElementById('vidForm');
	var tableBody = document.getElementById('tableBodyMovie');
	
	vidForm.addEventListener(
		'submit',
		videoUpload.bind(null, vidForm, tableBody)
	);
	tableBody.addEventListener('click', videoPlay);
}
	
window.onload = bootstrap();
