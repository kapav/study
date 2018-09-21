/*require(['jquery', 'actions/videoplay', 'actions/videoupload'], ($, videoPlay, videoUpload) => {
    'use strict';*/
import $ from 'jquery';
import videoPlay from './actions/videoplay';
import videoUpload from './actions/videoupload';
const $vidForm = $('#vidForm');
const $tableBody = $("#tableBody");
	
window.onload = (function() {
	$vidForm.on(
		'submit',
		videoUpload.bind(null, $vidForm, $tableBody)
	);
	$tableBody.on('click', videoPlay);
})();
/*});*/
