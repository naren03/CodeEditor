const htmlCode = document.querySelector('.html-code');
const cssCode = document.querySelector('.css-code');
const jsCode = document.querySelector('.js-code');
const output = document.querySelector('.output-display');
let htmlData, cssData, jsData;

let themeStyle = '3024-day';

//Main function to execute code
function run() {
	const bugIcon = document.getElementById('bug');

	try {
		output.contentDocument.body.innerHTML =
			htmlData + '<style>' + cssData + '</style>';
		output.contentWindow.eval(jsData);

		if (bugIcon.classList.contains('showBug'))
			bugIcon.classList.remove('showBug');
	} catch (e) {
		console.log('Error !!!');
		bugIcon.classList.add('showBug');
	}
}

//HTML EDITOR
let editor1 = CodeMirror.fromTextArea(htmlCode, {
	mode: 'text/html',
	theme: `${themeStyle}`,
	lineNumbers: true,
	autoCloseTags: true,
	lineWrapping: true,
	placeholder: 'Type HTML Here...',
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
	placeholder: 'Type CSS Here...',
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
	placeholder: 'Type JS Here...',
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

	//Call Download Function
	downloadFile();
});

//Download Function
function downloadFile() {
	//custom file name
	var userFileName = document.getElementById('userFileName').value;

	if (userFileName !== '') {
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
	} else {
		alert('File Name is Empty !!!');
	}
}
//Minimizing and Maximizing Buttons
let shrinkBtn1 = document.getElementById('shrink-btn1');
let shrinkBtn2 = document.getElementById('shrink-btn2');
let shrinkBtn3 = document.getElementById('shrink-btn3');

// HTML Shrink
shrinkBtn1.addEventListener('click', (e) => {
	e.preventDefault();
	let pane = document.getElementsByClassName('pane');

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

// CSS Shrink
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

// JS Shrink
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
	// Call Change Mode Function
	changeMode();
});

// Change Mode Function
function changeMode() {
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
}

// ShortCut Keys
//Array to store Keys Pressed
let keyArray = [];

document.addEventListener('keydown', (e) => {
	keyArray.push(e.key);
	// console.log(e.key);

	if (keyArray.length == 1) {
		if (checkDownKey()) {
		} else {
			keyArray = [];
		}
	}
	// if valid keys are pressed
	else if (keyArray.length == 2) {
		// For Tool Change T
		if (checkDownKey() && checkTKey()) {
			// Change Theme
			console.log('Change Theme');
			// Call Change Theme Function
			changeMode();

			keyArray = [];
		}

		// For Download D
		if (checkDownKey() && checkDKey()) {
			//Download
			console.log('Download');
			//Call Download Function
			downloadFile();
			keyArray = [];
		}

		// For Download C
		if (checkDownKey() && checkCKey()) {
			//Clear
			console.log('Clear');
			location.reload();
			keyArray = [];
		}

		keyArray = [];
	} else {
		keyArray = [];
	}
});

// Check Down Arrow Key
function checkDownKey() {
	if (keyArray[0] === 'ArrowDown') return 1;
	else return 0;
}

// Check T Key
function checkTKey() {
	if (keyArray[1] === 't' || keyArray[1] === 'T') return 1;
	else return 0;
}

// Check D Key
function checkDKey() {
	if (keyArray[1] === 'd' || keyArray[1] === 'D') return 1;
	else return 0;
}

// Check C Key
function checkCKey() {
	if (keyArray[1] === 'c' || keyArray[1] === 'C') return 1;
	else return 0;
}

// Top View Side View Functionality

const sideViewBtn = document.getElementById('side-view');
const topViewBtn = document.getElementById('top-view');

// Side View
sideViewBtn.addEventListener('click', () => {
	console.log('Side View');

	document.getElementsByClassName('editor')[0].classList.add('side');
	document.getElementsByClassName('wrapper')[0].classList.add('side');
	document.getElementsByClassName('output')[0].classList.add('side');
	document.getElementsByClassName('navigation-bar')[0].classList.add('side');
	document.body.style.overflowY = 'scroll';
	sideViewBtn.style.backgroundColor = 'gray';
	topViewBtn.style.backgroundColor = 'black';
});

// Top View
topViewBtn.addEventListener('click', () => {
	console.log('Top View');

	document.getElementsByClassName('editor')[0].classList.remove('side');
	document.getElementsByClassName('wrapper')[0].classList.remove('side');
	document.getElementsByClassName('output')[0].classList.remove('side');
	document.getElementsByClassName('navigation-bar')[0].classList.remove('side');
	document.body.style.overflow = 'hidden';

	topViewBtn.style.backgroundColor = 'gray';
	sideViewBtn.style.backgroundColor = 'black';
});
