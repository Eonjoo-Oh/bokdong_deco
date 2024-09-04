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

	// drawBokdong() {
	// 	drawImage(this.image, this.x, this.y, this.width, this.height)
	// }

	resize(newWidth, newHeight) {
		this.width = newWidth;
		this.height = newHeight;
	}
}

function generateBokdongId() {
	return ++bokdongId;
}

function drawBokdongs() {
	bokdongCtx.clearRect(0, 0, bokdongCanvas.width, bokdongCanvas.height);
	bokdongArr.forEach(bokdong => bokdong.drawBokdong());
}
//---------------------------------------

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
    const x = event.offsetX;
    const y = event.offsetY;
	console.log(x + ", " + y);
    selectedBokdong = bokdongArr.find(bokdong => 
        x >= bokdong.x && x <= bokdong.x + bokdong.width &&
        y >= bokdong.y && y <= bokdong.y + bokdong.height
    );
    console.log('Selected Bokdong:', selectedBokdong.id);
}

background.addEventListener("click", onBackgroundClick);
bokdong.addEventListener("click", onBokdongNavClick);
bokdongCanvas.addEventListener("click", onBokdongClick);
bokdongSizeSlider.addEventListener('input', function() {
    if (selectedBokdong) {
        const newSize = parseInt(this.value, 10);
        selectedBokdong.resize(newSize, newSize);  // 가로와 세로 크기를 동일하게 조절
		console.log("resize! : ", selectedBokdong);
		bokdongCtx.clearRect(0, 0, bokdongCanvas.width, bokdongCanvas.height);
		bokdongArr.forEach((bokdong) => bokdongCtx.drawImage(bokdong.image, bokdong.x, bokdong.y, bokdong.width, bokdong.height));
		
		// bokdongCtx.drawImage(selectedBokdong.image, selectedBokdong.x, selectedBokdong.y, bokdongCanvas.width, bokdongCanvas.height);
		// bokdongCtx.clearRect(0, 0, bokdongCanvas.width, bokdongCanvas.height);
        // 
		// drawBokdong();  // 복동이 재그리기
    }
});