const htmlCode = document.querySelector('.html-code');
const cssCode = document.querySelector('.css-code');
const jsCode = document.querySelector('.js-code');
const output = document.querySelector('.output-display');
let htmlData, cssData, jsData;

let themeStyle = '3024-day';

//On Load
document.addEventListener('DOMContentLoaded', () => {
	//getting data from local storage and running if page reloads
	htmlData = JSON.parse(localStorage.getItem('code')).html;
	cssData = JSON.parse(localStorage.getItem('code')).css;
	jsData = JSON.parse(localStorage.getItem('code')).js;

	// console.log(htmlData + cssData + jsData);
});

//Main function to execute code
function run() {
	output.contentDocument.body.innerHTML =
		htmlData + '<style>' + cssData + '</style>';
	output.contentWindow.eval(jsData);

	//Data to store in local Storage
	const localData = {
		html: htmlData,
		css: cssData,
		js: jsData,
	};

	//Storing data in Local Storage
	localStorage.setItem('code', JSON.stringify(localData));
}

//HTML EDITOR
let editor1 = CodeMirror.fromTextArea(htmlCode, {
	mode: 'text/html',
	theme: `${themeStyle}`,
	lineNumbers: true,
	autoCloseTags: true,
	lineWrapping: true,
});

//When editors value changes
CodeMirror.on(editor1, 'change', () => {
	htmlData = editor1.getValue();

	//call the main function
	run();
});

//CSS EDITOR
let editor2 = CodeMirror.fromTextArea(cssCode, {
	mode: 'css',
	theme: `${themeStyle}`,
	lineNumbers: true,
	autoCloseTags: true,
	lineWrapping: true,
});

//When editors value changes
CodeMirror.on(editor2, 'change', () => {
	cssData = editor2.getValue();

	//call the main function
	run();
});

//JS EDITOR
let editor3 = CodeMirror.fromTextArea(jsCode, {
	mode: 'javascript',
	theme: `${themeStyle}`,
	lineNumbers: true,
	autoCloseTags: true,
	lineWrapping: true,
});

//When editors value changes
CodeMirror.on(editor3, 'change', () => {
	jsData = editor3.getValue();

	//call the main function
	run();
});

//Download Functionality
document.getElementById('download-btn').addEventListener('click', (e) => {
	e.preventDefault();

	//custom file name
	var userFileName = document.getElementById('userFileName').value;

	//generate File
	var text = htmlData;
	var filename = `${userFileName}.html`;

	//create blob
	var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

	//genarte file download(saveas)
	saveAs(blob, filename);

	//generate File
	text = cssData;
	filename = `${userFileName}.css`;

	//create blob
	blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

	//genarte file download(saveas)
	saveAs(blob, filename);

	//generate File
	text = jsData;
	filename = `${userFileName}.js`;

	//create blob
	blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

	//genarte file download(saveas)
	saveAs(blob, filename);
});

//extra
let shrinkBtn1 = document.getElementById('shrink-btn1');
let shrinkBtn2 = document.getElementById('shrink-btn2');
let shrinkBtn3 = document.getElementById('shrink-btn3');

shrinkBtn1.addEventListener('click', (e) => {
	e.preventDefault();
	let pane = document.getElementsByClassName('pane');
	// pane[0].style.flexBasis = '0';
	if (pane[0].classList.contains('shrink')) {
		pane[0].classList.remove('shrink');
		pane[0].classList.add('expand');

		shrinkBtn1.innerHTML = '<i class="fas fa-compress-alt"></i>';
	} else {
		pane[0].classList.remove('expand');
		pane[0].classList.add('shrink');

		shrinkBtn1.innerHTML = '<i class="fas fa-expand-alt"></i>';
	}
});
shrinkBtn2.addEventListener('click', (e) => {
	e.preventDefault();
	let pane = document.getElementsByClassName('pane');
	if (pane[1].classList.contains('shrink')) {
		pane[1].classList.remove('shrink');
		pane[1].classList.add('expand');

		shrinkBtn2.innerHTML = '<i class="fas fa-compress-alt"></i>';
	} else {
		pane[1].classList.remove('expand');
		pane[1].classList.add('shrink');

		shrinkBtn2.innerHTML = '<i class="fas fa-expand-alt"></i>';
	}
});
shrinkBtn3.addEventListener('click', (e) => {
	e.preventDefault();
	let pane = document.getElementsByClassName('pane');
	if (pane[2].classList.contains('shrink')) {
		pane[2].classList.remove('shrink');
		pane[2].classList.add('expand');

		shrinkBtn3.innerHTML = '<i class="fas fa-compress-alt"></i>';
	} else {
		pane[2].classList.remove('expand');
		pane[2].classList.add('shrink');

		shrinkBtn3.innerHTML = '<i class="fas fa-expand-alt"></i>';
	}
});

//Dark mode and Light Mode Functionality
document.getElementById('theme').addEventListener('click', () => {
	// if light mode is on
	if (document.getElementById('theme').classList.contains('light')) {
		for (let i = 0; i < 3; i++) {
			document
				.querySelectorAll('.CodeMirror')
				[i].classList.remove('cm-s-3024-day');
			document.querySelectorAll('.CodeMirror')[i].classList.add('cm-s-dracula');

			document.querySelectorAll('h4')[i].style.backgroundColor = '#282a36';
			document.querySelectorAll('h4')[i].style.color = '#f7f7f7';
		}

		document.getElementById('theme').children[0].src = 'img/dark-mode.png';
		document.getElementById('theme').classList.remove('light');
		document.getElementById('theme').classList.add('dark');
	}

	//if dark mode is on
	else {
		for (let i = 0; i < 3; i++) {
			document
				.querySelectorAll('.CodeMirror')
				[i].classList.remove('cm-s-dracula');
			document
				.querySelectorAll('.CodeMirror')
				[i].classList.add('cm-s-3024-day');

			document.querySelectorAll('h4')[i].style.backgroundColor = '#f7f7f7';
			document.querySelectorAll('h4')[i].style.color = '#282a36';
		}

		document.getElementById('theme').children[0].src = 'img/light-mode.png';
		document.getElementById('theme').classList.remove('dark');
		document.getElementById('theme').classList.add('light');
	}
});
