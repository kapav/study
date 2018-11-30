//var videoPlay = require('./actions/videoplay');
//var videoUpload = require('./actions/videoupload');

import videoUpload from './actions/videoupload';
import videoPlay from './actions/videoplay';
import '../../css/index.css';

if (NODE_ENV == 'development') {
	console.log('NODE_ENV from \'main.js\':', NODE_ENV);
}

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

function sayWelcome(event) {
	require.ensure([], function(require) {
		let welcome = require('./actions/dynamicFunc');
		
		welcome.dynamicFunc();
	});
	
	event.preventDefault();
}
	
window.onload = bootstrap();

export const welcome = function() {
	console.log('Welcome from the \'main.js\' module.');
};

document.getElementById('nameSubmit').addEventListener('click', sayWelcome);
