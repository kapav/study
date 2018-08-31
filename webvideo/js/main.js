(function() {
	'use strict';
	var vidForm = document.forms.vidForm,
		vidInput = vidForm[0],
		vidSubmit = vidForm[1],
		folder = "video/",
		tableLayout = $("#tableLayout"),
		rowTemplateFunc = _.template($('#rowTemplate').html());
		
	$.ajax({
		url: folder,
		success: function (data) {
			$(data).find('a').attr('href', function(indexOfRow, filename) {
				var html = rowTemplateFunc({
					indexOfRow: indexOfRow,
					folder: folder,
					filename: filename
				});
				tableLayout.append(html);
			});
		}
	});
})();