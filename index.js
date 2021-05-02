const htmlCode = document.querySelector('.html-code');
const cssCode = document.querySelector('.css-code');
const jsCode = document.querySelector('.js-code');
const output = document.querySelector('.output-display');

function run() {
	output.contentDocument.body.innerHTML =
		htmlCode.value + '<style>' + cssCode.value + '</style>';
	output.contentWindow.eval(jsCode.value);
}

htmlCode.addEventListener('keyup', run);
cssCode.addEventListener('keyup', run);
jsCode.addEventListener('keyup', run);
