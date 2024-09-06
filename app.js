const backgroundCanvas = document.querySelector("#backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");
const bokdongCanvas = document.querySelector("#bokdongCanvas");
const bokdongCtx = bokdongCanvas.getContext("2d");

const background = document.getElementById("background");
const bokdong = document.getElementById("bokdong");
const bokdongSizeSlider = document.getElementById("bokdongSizeSlider");

let bokdongId = 0;
let bokdongNum = 0;
const bokdongArr = [];

let activeBokdong = null;

let isDragging = false;
let offsetX;
let offsetY;

backgroundCanvas.width = 700;
backgroundCanvas.height = 700;
bokdongCanvas.width = 700;
bokdongCanvas.height = 700;

//----------------------복동 객체 생성 -----------------------

class Bokdong {
	constructor(imgSrc, x, y, width, height, id) {
		this.id = id;
		this.imgSrc = imgSrc;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.image = new Image();
		this.image.src = imgSrc;
		++bokdongNum;
	}

	resize(newWidth, newHeight) {
		this.width = newWidth;
		this.height = newHeight;
		//x, y좌표도 갱신해줘야됨. 원래사이즈보다 커지면 차이만큼 + 아니면 차이만큼 -
	}
}

function generateBokdongId() {
	return ++bokdongId;
}

//---------------- util funcs -----------------------

function selectBokdong(event) {
	const x = event.offsetX;
    const y = event.offsetY;
	console.log(x + ", " + y);
	for(let i = bokdongArr.length - 1; i >= 0; i--) {
		if (x >= bokdongArr[i].x && x <= bokdongArr[i].x + bokdongArr[i].width &&
			y >= bokdongArr[i].y && y <= bokdongArr[i].y + bokdongArr[i].height) {
				activeBokdong = bokdongArr[i];
				console.log("selecetedBokdong: ", activeBokdong);
				return activeBokdong;
			}
		}
	return false;
}


//--------------------------------------
function onDocumentClick(event) {
	if (!selectBokdong(event) && event.target !== bokdongSizeSlider) {
		activeBokdong = null;
		bokdongSizeSlider.style.display = 'none';
	}
}

function onBackgroundClick(event) {
	console.log("onbackgroundclick!");
	if (event.target.tagName === 'IMG') {
		const imgSrc = event.target.getAttribute('src');
		const img = new Image();
		img.src = imgSrc;

		img.onload = function() {
			backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
			backgroundCtx.drawImage(img, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
		};
	}
}

function onBokdongNavClick(event) {
	console.log("onbockdongNavclick!");
	if (bokdongNum >= 10) {
		alert("최대 수용 인원을 초과했습니다!");
		return ;
	}
	let x, y, width, height;
	if (event.target.tagName === 'IMG') {
		const imgSrc = event.target.getAttribute('src');
		if (imgSrc === 'srcs/bokdong/bokdong1.png') {
			x = 208;
			y = 4;
			width = 400;
			height = 400;
			// x = 208;
			// y = 4;
			// width = 241;
			// height = 688; 초기설정값
		}

		if (imgSrc === 'srcs/bokdong/bokdong2.png') {
			x = 12;
			y = 215;
			width = 400;
			height = 400;
			// x = 12;
			// y = 215;
			// width = 676;
			// height = 195; 초기설정값
		}
		const newBokdong = new Bokdong(imgSrc, x, y, width, height, generateBokdongId());
		bokdongArr.push(newBokdong);
		bokdongCtx.drawImage(newBokdong.image, x, y, width, height);

		console.log(bokdongArr);
	}
}

function onBokdongClick(event) {
	if (selectBokdong(event)) {
		bokdongSizeSlider.style.display = 'block';
	}
}

function resizeBokdong(event) {
	if (activeBokdong) {
		const inputValue = parseInt(event.target.value, 10);
		activeBokdong.resize(inputValue, inputValue);
		bokdongCtx.clearRect(0, 0, bokdongCanvas.width, bokdongCanvas.height);
		bokdongArr.forEach((bokdong) => bokdongCtx.drawImage(bokdong.image, bokdong.x, bokdong.y, bokdong.width, bokdong.height));
	}
}

function onBokdongMouseDown(event) {
	if (selectBokdong(event)) {
		isDragging = true;
		offsetX = event.offsetX - activeBokdong.x;
		offsetY = event.offsetY - activeBokdong.y;
		console.log("Drag start");
	}
}

function onBokdongMouseMove(event) {
	if (isDragging && activeBokdong) {
		activeBokdong.x = event.offsetX - offsetX;
		activeBokdong.y = event.offsetY - offsetY;
		
		bokdongCtx.clearRect(0, 0, bokdongCanvas.width, bokdongCanvas.height);
		bokdongArr.forEach((bokdong) => bokdongCtx.drawImage(bokdong.image, bokdong.x, bokdong.y, bokdong.width, bokdong.height));
		console.log("mouseMove!");
	}
}

function onBokdongMouseUp(event) {
	if (isDragging) {
		isDragging = false;
		console.log("drag done");
	}
}

document.addEventListener("click", onDocumentClick); 
background.addEventListener("click", onBackgroundClick);
bokdong.addEventListener("click", onBokdongNavClick);
bokdongCanvas.addEventListener("click", onBokdongClick);
bokdongSizeSlider.addEventListener("input", resizeBokdong);
bokdongCanvas.addEventListener("mousedown", onBokdongMouseDown);
bokdongCanvas.addEventListener("mousemove", onBokdongMouseMove);
bokdongCanvas.addEventListener("mouseup", onBokdongMouseUp);