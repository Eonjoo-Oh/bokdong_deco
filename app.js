const backgroundCanvas = document.querySelector("#backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");
const bokdongCanvas = document.querySelector("#bokdongCanvas");
const bokdongCtx = bokdongCanvas.getContext("2d");

const background = document.getElementById("background");
const bokdong = document.getElementById("bokdong");
const bokdongSizeSlider = document.getElementById("bokdongSizeSllider");

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
		bokdongNum++;
	}

	drawBokdong(bokdongCtx) {
		bokdongCtx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}

	resize(newWidth, newHeight) {
		this.width = newWidth;
		this.height = newHeight;
	}
}

let bokdongId = 0;
let bokdongNum = 0;
function generateBokdongId() {
	return ++bokdongId;
}

const bokdongArr = [];
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
	if (event.target.tagName === 'IMG') {
		const imgSrc = event.target.getAttribute('src');
		const newBokdong = new Bokdong(imgSrc, 0, 0, 100, 100, generateBokdongId());
		bokdongArr.push(newBokdong);
		bokdongCtx.drawImage(newBokdong.image, 0, 0, bokdongCanvas.width, bokdongCanvas.height);

		console.log(bokdongArr);
	}
}

background.addEventListener("click", onBackgroundClick);
bokdong.addEventListener("click", onBokdongNavClick);