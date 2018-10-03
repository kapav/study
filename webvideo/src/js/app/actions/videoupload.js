//var _ = require('lodash');
var rowTemplate = document.getElementById('rowTemplate');
var rowTemplateFunc = _.template(rowTemplate.innerHTML);
var currentRowNumber = 1;
	
/**
* Increments the row number in the videomovie table and returns the current number
* @return {integer} the current row number
**/	
function incrementRowNumber() {
	return currentRowNumber++;
}
	
/**
* Uploads a videomovie to the videomovie table
* @param {Object} vidForm is the videomovie input form
* @param {Object} tableBody is the body of the videomovie table
* @param {Object} event is the 'submit' event of the videomovie input form
**/	
function videoUpload(vidForm, tableBody, event) {
	var files = event.target[0].files;
	var	resetVidFormEvent = null;
	
	for (var i = 0; i < files.length; i++) {
		tableBody.insertAdjacentHTML('beforeEnd',
			rowTemplateFunc({
				indexOfRow: incrementRowNumber(),
				blob: window.URL.createObjectURL(files[i]),
				filename: files[i].name
			})
		);
	}
	
	event.preventDefault();
	
	resetVidFormEvent = document.createEvent('HTMLEvents');
	resetVidFormEvent.initEvent('reset', false, true);
	vidForm.dispatchEvent(resetVidFormEvent);
}

//export default videoUpload;
