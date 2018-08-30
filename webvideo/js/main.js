(function() {
	'use strict';
	var folder = "video/",
		tableLayout = $("#tableLayout"),
		rowTemplateFunc = _.template($('#rowTemplate').html());
		
	function renderRows() {
		var html = rowTemplateFunc({  });
		tableLayout.append(html);
	}
		
	$.ajax({
		url: folder,
		success: function (data) {
			$(data).find("a").attr("href", function(indexOfRow, filename) {
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