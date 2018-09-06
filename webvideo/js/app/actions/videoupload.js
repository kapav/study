const rowTemplateFunc = _.template($('#rowTemplate').html());
let currentCount = 1;
	
function getCurrentCount() {
	return currentCount++;
}
	
export default function videoUpload($vidForm, $tableBody, event) {
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
