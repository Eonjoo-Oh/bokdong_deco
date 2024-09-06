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

let selectedBokdong = null;

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

function isBokdongSelected(event) {
	const x = event.offsetX;
    const y = event.offsetY;
	console.log(x + ", " + y);
	for(let i = bokdongArr.length - 1; i >= 0; i--) {
		if (x >= bokdongArr[i].x && x <= bokdongArr[i].x + bokdongArr[i].width &&
			y >= bokdongArr[i].y && y <= bokdongArr[i].y + bokdongArr[i].height) {
				selectedBokdong = bokdongArr[i];
				// bokdongSizeSlider.style.display = 'block';
				console.log("selecetedBokdong: ", selectedBokdong);
				return true;
			}
			return false;
	}
}


//--------------------------------------
function onDocumentClick(event) {
	if (!isBokdongSelected(event) && event.target !== bokdongSizeSlider) {
		selectedBokdong = null;
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
			width = 241;
			height = 688;
		}

		if (imgSrc === 'srcs/bokdong/bokdong2.png') {
			x = 12;
			y = 215;
			width = 676;
			height = 195;
		}
		const newBokdong = new Bokdong(imgSrc, x, y, width, height, generateBokdongId());
		bokdongArr.push(newBokdong);
		bokdongCtx.drawImage(newBokdong.image, 0, 0, bokdongCanvas.width, bokdongCanvas.height);

		console.log(bokdongArr);
	}
}

function onBokdongClick(event) {
	if (isBokdongSelected(event)) {
		bokdongSizeSlider.style.display = 'block';
	}
}

function resizeBokdong(event) {
	if (selectedBokdong) {
		const inputValue = parseInt(event.target.value, 10);
		selectedBokdong.resize(inputValue, inputValue);
		bokdongCtx.clearRect(0, 0, bokdongCanvas.width, bokdongCanvas.height);
		bokdongArr.forEach((bokdong) => bokdongCtx.drawImage(bokdong.image, bokdong.x, bokdong.y, bokdong.width, bokdong.height));
	}
}

document.addEventListener("click", onDocumentClick); 
background.addEventListener("click", onBackgroundClick);
bokdong.addEventListener("click", onBokdongNavClick);
bokdongCanvas.addEventListener("click", onBokdongClick);
bokdongSizeSlider.addEventListener("input", resizeBokdong);