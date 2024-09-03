const backgroundCanvas = document.querySelector("#backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");
const bokdongCanvas = document.querySelector("#bokdongCanvas");
const bokdongCtx = bokdongCanvas.getContext("2d");

const background = document.getElementById("background");
const bokdong = document.getElementById("bokdong");

backgroundCanvas.width = 700;
backgroundCanvas.height = 700;
bokdongCanvas.width = 700;
bokdongCanvas.height = 700;


function onBgClick(event) {
	console.log("onbgclick!");
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

function onBokdongClick(event) {
	console.log("onbockdongclick!");
	if (event.target.tagName === 'IMG') {
		const imgSrc = event.target.getAttribute('src');
		const img = new Image();
		img.src = imgSrc;

		img.onload = function() {
			bokdongCtx.drawImage(img, 0, 0, bokdongCanvas.width, bokdongCanvas.height);
		};
	}
}

background.addEventListener("click", onBgClick);
bokdong.addEventListener("click", onBokdongClick);