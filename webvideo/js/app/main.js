require(['jquery', 'actions/videoplay', 'actions/videoupload'], ($, videoPlay, videoUpload) => {
    'use strict';
	var $vidForm = $('#vidForm'),
		$tableBody = $("#tableBody");
		
	window.onload = (function() {
		$vidForm.on(
			'submit',
			videoUpload.bind(null, $vidForm, $tableBody)
		);
		$tableBody.on('click', videoPlay);
	})();
});