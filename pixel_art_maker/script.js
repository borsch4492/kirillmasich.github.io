let canvas = document.getElementById('canvas');
let canvasW = 15;
let canvasH = 15;
let isMoseDown = false;

let colors = ['#ffffff', '#000000', '#c0c0c0', '#ff0000', '#00ff00', '#0000ff', '#ffff00'];
const defaultSelectedColorNumber = 2;
let currentColorDiv = null;


//----------------------------------------------------------------------

function getCurrentColor() {
	if (!currentColorDiv) {
		return "#FFFFFF";
	} else {
		return currentColorDiv.style.backgroundColor;
	}
}



let documentMouseDownHendler = function(e){
	//console.log('moseDown', e.target);
	//console.log('moseDown', e.target.getAttribute('x'), e.target.getAttribute('y'));
	if (e.target.className == 'canvas-div' || e.target.className == 'canvas-td') {
	  e.target.style.backgroundColor = getCurrentColor(); //"#c0c0c0";
	  isMoseDown = true;
	}
};


let documentMouseUpHendler = function(e){
	isMoseDown = false;
};


let documentMouseMoveHendler = function(e){
	if (isMoseDown && e.target.className == 'canvas-div') {
		e.target.style.backgroundColor = getCurrentColor(); //"#c0c0c0";
	}
};


document.addEventListener('mousedown', documentMouseDownHendler);
document.addEventListener('mouseup', documentMouseUpHendler);
document.addEventListener('mousemove', documentMouseMoveHendler);


let clearHendler = function(e){
	canvasW = newSize;
	canvasH = newSize;
	createCanvas(canvasW, canvasH);
}


let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearHendler);



let size = document.getElementById('size');
let sizeValue = document.getElementById('sizeValue');
let newSize = 15;

let applySizeHendler = function(){
	newSize = size.value;
	sizeValue.innerHTML = '' + size.value + 'x' + size.value;
}

size.addEventListener('change', applySizeHendler);


//----------------------------------------------------------------------


function createCanvas(w, h){
	canvas.innerHTML = '';
	let cTable = document.createElement('table');
	cTable.className = 'canvas-table';
	//cTable.addEventListener('mousedown', documentMouseDownHendler);
	//cTable.addEventListener('mouseup', documentMouseUpHendler);
	//cTable.addEventListener('mousemove', documentMouseMoveHendler);
	for (let y=0; y<h; y++) {
		let cRow = document.createElement('tr');
		//cRow.className = 'canvas-tr';
		for (let x=0; x<w; x++) {
			let cData = document.createElement('td');
			cData.className = 'canvas-td';
			let cDiv = document.createElement('div');
			cDiv.className = 'canvas-div';
			cDiv.setAttribute('x', x);
			cDiv.setAttribute('y', y);
			cDiv.style.backgroundColor = getCurrentColor(); //"#ffffff";
			cDiv.ondragstart  = function () { return false; };
			cData.appendChild(cDiv);
			cRow.appendChild(cData);
		}
		cTable.appendChild(cRow);
	}
	canvas.appendChild(cTable);
}


createCanvas(canvasW, canvasH);


//----------------------------------------------------------------------


let colDivClickHeandler = function(e) {
	let prevColTD = currentColorDiv.parentNode;
	prevColTD.className = 'color-td';
	
	currentColorDiv = e.target;
	let curColTD = currentColorDiv.parentNode;
	curColTD.className = 'color-td-selected';
}


let colorsBar = document.getElementById('colorsBar');

function createColors(){
	colorsBar.innerHTML = '';
	let cTable = document.createElement('table');
	let cRow = document.createElement('tr');
	for (let i=0; i<colors.length; i++) {
		let cData = document.createElement('td');
		cData.className = 'color-td';
		let colDiv = document.createElement('div');
		if (i == defaultSelectedColorNumber) {
			cData.className = 'color-td-selected';
			//currentColorDiv = colDiv;
		} else {
			cData.className = 'color-td';
		}
		colDiv.className = 'color-div';
		colDiv.style.backgroundColor = colors[i];
		cData.appendChild(colDiv);
		if (i == defaultSelectedColorNumber) {
			currentColorDiv = colDiv;
		}
		colDiv.addEventListener('click', colDivClickHeandler);
		cRow.appendChild(cData);
	}
	cTable.appendChild(cRow);
	colorsBar.appendChild(cTable);
}


createColors();