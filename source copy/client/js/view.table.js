scrumapp.views["table"] = {
	c: undefined,
	ctx: undefined,
	fibNums: ["0", ".5", "1", "2", "3", "5", "8", "13", "20"],
	fontSize: 30,
	gridCount: 3,
	buttonCount: 9,
	btnArr: [],
	margin: 20,
	btnRadius: undefined,
	w: 320,
	h: 480,
	gridW: undefined, 
	gridH: undefined,
	headerSize: 40,
	xOffset: undefined, 
	yOffset: undefined,
	

	init: function(){
		btnRadius = 140-(this.margin*2);
		this.setStatus();
		// console.log("table.init() called");
		this.initEvents();
		this.initCanvas();
		this.initTimer();
	},
	setStatus: function(){
		$('footer div#status').text("select level of effort");
	},
	initEvents: function(){
		window.addEventListener("touchstart", this.doTouchStart, false);
		window.addEventListener("mousedown", this.doTouchStart, false);
	},
	initCanvas: function(){	
		this.c = document.getElementById('tablecanvas');
		this.ctx = this.c.getContext('2d');
		this.ctx.font = this.fontSize+'pt '+'universcondensed';
		this.ctx.textAlign = "center";
		this.initGrid();
	},

	initTimer: function(){
        window.requestAnimationFrame($.proxy(this.initTimer, this));
        this.draw();
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
	doTouchStart: function(e){
		//console.log("pressed");
		e.preventDefault();	
		$.proxy(this.pressedCheck(e), this);
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
		// console.log("initGrid()");
		var gridW = this.gridW, 
		gridH = this.gridH, 
		xOffset = this.xOffset, 
		yOffset = this.yOffset, 
		gridCount = this.gridCount, 
		btnRadius = this.btnRadius, 
		buttonCount = this.buttonCount,
		headerSize = this.headerSize,
		w = this.w, 
		h = this.h;
		//
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
			this.btnArr.push(obj);
		}
	},
	draw: function(){
		var ctx = this.ctx;
		//console.log('draw()');
		//ctx.clearRect(0,0,w, h);
		for (var i = 0; i < this.btnArr.length; i++) {
			var obj = this.btnArr[i];
			ctx.beginPath();
			ctx.arc(obj.x, obj.y, this.btnRadius/3, 0, Math.PI*2);
			
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
			ctx.fillText(this.fibNums[i], obj.x, obj.y + this.fontSize/2);

		}

		// ctx.beginPath();
		// ctx.arc(test.x, test.y, 10, 0, Math.PI*2);
		// ctx.fillStyle = '#f00';
		// ctx.fill();
		

	}
}

