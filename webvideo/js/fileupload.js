window.onload = (function() {
	'use strict';
	var $vidForm = $('#vidForm'),
		$tableBody = $("#tableBody"),
		rowTemplateFunc = _.template($('#rowTemplate').html()),
		currentCount = 1;
		
	function getCurrentCount() {
		return currentCount++;
	}
		
	function submitHandler(event) {
		var files = event.target[0].files,
			wrapper = document.getElementById('wrapper'),
			video = null,
			source = null,
			i;
		
		for (i = 0; i < files.length; i++) {
			$tableBody.append(
				rowTemplateFunc({
					indexOfRow: getCurrentCount(),
					blob: window.URL.createObjectURL(files[i]),
					filename: files[i].name
				})
			);
		}
		
		event.preventDefault();
		$vidForm.trigger('reset');
	}
	
	$vidForm.on('submit', submitHandler);
})();