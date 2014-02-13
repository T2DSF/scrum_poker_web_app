var scrumapp = {
	c: undefined,
	ctx: undefined,
	fibNums: ["0", ".5", "1", "2", "3", "5", "8", "13", "20"],
	fontSize: 30,
	gridCount: 3,
	buttonCount: 9,
	btnArr: [],
	margin: 20,
	btnRadius:140-(this.margin*2),
	w: 320,
	h: 480,
	gridW: undefined, 
	gridH: undefined,
	headerSize: 40,
	test: {x:0, y:0},
	xOffset: undefined, 
	yOffset: undefined,
	views: [],
	//initScreen(),

	init: function(){
		this.initScreen();
		addEventListener("touchstart", doTouchStart, false);
		addEventListener("touchmove", doTouchMove, false);
		addEventListener("touchend", doTouchEnd, false);
		addEventListener("mousedown", doTouchStart, false);
		addEventListener("mouseup", doTouchEnd, false);
		//initCanvas();
		//initTimer();
	},
	initScreen: function(){

		// console.log("initScreen");
		if( !this.ls.get_local_storage_name() ){
			this.setView("setup");
		}else{
			this.setView("jointable")
		}
	},
	setUsername: function(){
		console.log("script.setUsername() ");
		this.views["setup"].setUsername();
	},
	attemptToJoin: function(){
		console.log("scrumapp.attemptToJoin() ");
		this.views["jointable"].attemptToJoin();	
	},
	setView: function(screenName){
		console.log("***** settingScreen: "+screenName);
		
		var $activeScreen = $("#container .active")[0];
	    if ($activeScreen) {
	        $("div.active").toggleClass("active");
	    }
	   var id = "#"+screenName;
	   // console.log(id);
	   $(id).addClass('active');
	   
	   // console.log(this.views.length);
	   this.views[screenName].init();

	},
	initTimer: function(){
        window.requestAnimationFrame(initTimer);
        draw();
	},
	initCanvas: function(){	
		c = document.getElementById('maincanvas');
		ctx = c.getContext('2d');
		ctx.font = fontSize+'pt '+'biko';
		ctx.textAlign = "center";
		initGrid();
	},
	doTouchStart: function(e){
		//console.log("pressed");
		e.preventDefault();	
		pressedCheck(e);
	},
	doTouchMove: function(e){
		e.preventDefault();
	},
	doTouchEnd: function(e){
		e.preventDefault();
		//console.log("released");
	},
	pressedCheck: function(e){
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
	},
	checkDist: function(a,b){
		var dist = 0;
		var xx = b.x - a.x;
		xx = xx*xx;
		var yy = b.y - a.y;
		yy = yy*yy;
		dist = Math.sqrt( xx + yy );

		return dist;
	},
	initGrid: function(){
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
			btnArr.push(obj);
		}
	},
	draw: function(){
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

};
window.scrumapp = scrumapp;
$(document).ready(function(){
	scrumapp.initScreen();
});