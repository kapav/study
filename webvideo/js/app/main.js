import videoPlay from './actions/videoplay';
import videoUpload from './actions/videoupload';
	
/**
* Performs the initial loading of the page
**/	
function bootstrap() {
	const vidForm = document.getElementById('vidForm');
	const tableBody = document.getElementById('tableBody');
	
	vidForm.addEventListener(
		'submit',
		videoUpload.bind(null, vidForm, tableBody)
	);
	tableBody.addEventListener('click', videoPlay);
}
	
window.onload = bootstrap();
