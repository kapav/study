window.onload = (function() {
	'use strict';
	var $vidForm = $('#vidForm'),
		$vidInput = $('#videoFileInput'),
		$vidSubmit = $('#vidSubmit'),
		folder = "video/",
		$tableLayout = $("#tableLayout"),
		rowTemplateFunc = _.template($('#rowTemplate').html());
		
	$tableLayout.append(
		rowTemplateFunc({
			indexOfRow: 100,
			folder: folder,
			filename: 'MP4_big_buck_bunny.mp4'
		})
	);
	
	function submitHandler(event) {
		var files = event.target[0].files,
			wrapper = document.getElementById('wrapper'),
			video = null;
		
		event.preventDefault();

		// Loop through the FileList and render image files as thumbnails.
		for (var i = 0, f; f = files[i]; i++) {
			video = document.createElement('video');
				
			video.innerHTML = [
				'<video height="150"><source src="',
				window.URL.createObjectURL(f),
				'">The video tag is not supported</video>'
			].join('');
			wrapper.append(video);
		}
	}
	
	$vidForm.on('submit', submitHandler);
	
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
})();