$(document).ready(function(){

var c;
var ctx;
var fibNums = ["0", ".5", "1", "2", "3", "5", "8", "13", "20"];
var fontSize = 30;
var gridCount = 3;
var buttonCount = 9;
var btnArr = [];
var margin = 20;
var btnRadius =140-(margin*2);
var w = 320;
var h = 480;
var gridW, gridH;
var headerSize = 40;
var test = {x:0, y:0};
var xOffset, yOffset;
init();




function init(){
	document.panel = this;
	addEventListener("touchstart", doTouchStart, false);
	addEventListener("touchmove", doTouchMove, false);
	addEventListener("touchend", doTouchEnd, false);
	addEventListener("mousedown", doTouchStart, false);
	addEventListener("mouseup", doTouchEnd, false);
	initCanvas();
	initTimer();
}

function initTimer(){
        
        window.requestAnimationFrame(initTimer);
        draw();
}


function initCanvas(){
	//
	c = document.getElementById('maincanvas');
	ctx = c.getContext('2d');
	ctx.font = fontSize+'pt '+'biko';
	ctx.textAlign = "center";

	// console.log(c);

	initGrid();
}

function doTouchStart(e){
	//console.log("pressed");
	e.preventDefault();	
	pressedCheck(e);
}

function doTouchMove(e){
	e.preventDefault();
}

function doTouchEnd(e){
	e.preventDefault();
	//console.log("released");
}

function pressedCheck(e){
	// console.log(e.pageX+" "+e.clientX);
	var obj; 
	test = {x:e.pageX-xOffset-(btnRadius*2), y:e.pageY};
	//console.log(test.x+" "+test.y);
	var clickPt = {x:e.pageX-xOffset-(btnRadius*2), y:e.pageY};
	var dist;
	//console.log("clickPt  is: "+clickPt.x+" | "+clickPt.y);
	for (var i = 0; i < btnArr.length; i++) {
		obj = btnArr[i];

		dist = checkDist(obj, clickPt);
		//console.log(clickPt.y+" "+obj.y);
		//console.log(i+": "+dist+"  "+btnRadius);
		if(dist < btnRadius/3){
			//hit
			obj.isClicked = true;
			console.log('click '+fibNums[obj.i]);
		// }else{
			// console.log()
		}else{
			obj.isClicked = false;
		}



	}
}

function checkDist(a,b){
var dist = 0;
var xx = b.x - a.x;
xx = xx*xx;
var yy = b.y - a.y;
yy = yy*yy;
dist = Math.sqrt( xx + yy );


return dist;
}

function initGrid(){
	gridW = ((buttonCount-1)%gridCount)*btnRadius;
	gridH = Math.floor((buttonCount-1)/gridCount)*btnRadius;
	xOffset = w/2-(gridW/2);
	yOffset = h/2-(gridH/2) + headerSize;
	for(var i=0; i<buttonCount; i++){
		var obj = {
			i:i,
			isClicked: false
		};
		
		obj.x = (i%gridCount)*btnRadius+ xOffset;
		obj.y = Math.floor(i/gridCount)* btnRadius + yOffset;
		//console.log(obj.y);


		btnArr.push(obj);
	}
	//console.log(gridW+" "+gridH);
	
}

function draw(){
	//ctx.clearRect(0,0,w, h);
	for (var i = 0; i < btnArr.length; i++) {
		var obj = btnArr[i];
		ctx.beginPath();
		ctx.arc(obj.x, obj.y, btnRadius/3, 0, Math.PI*2);
		
		if(obj.isClicked){
			ctx.fillStyle = '#fb1e60';	
		}else{
			ctx.fillStyle = '#fff';
		}
		
		ctx.fill();

		
		if(obj.isClicked){
			ctx.fillStyle = "#fff";
		}else{
			ctx.fillStyle = "#00afea";
		}
		ctx.fillText(fibNums[i], obj.x, obj.y + fontSize/2);

	}

	// ctx.beginPath();
	// ctx.arc(test.x, test.y, 10, 0, Math.PI*2);
	// ctx.fillStyle = '#f00';
	// ctx.fill();
	

}




});