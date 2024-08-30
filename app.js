const bgPhoto = document.getElementById("background");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;


function onBgClick(event) {
	console.log("onbgclick!");
	if (event.target.tagName === 'IMG') {
		const imgSrc = event.target.getAttribute('src');
		const img = new Image();
		img.src = imgSrc;

		img.onload = function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		};
	}
}

bgPhoto.addEventListener("click", onBgClick);