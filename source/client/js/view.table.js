scrumapp.views["table"] = {
	
	c: undefined,
	ctx: undefined,
	fibNums: ["0", ".5", "1", "2", "3", "5", "8", "13", "20"],
	fontSize: 30,
	gridCount: 3,
	buttonCount: 9,
	btnArr: [],
	margin: 20,
	btnRadius:undefined,
	w: 320,
	h: 480,
	gridW: undefined, 
	gridH: undefined,
	headerSize: 40,
	xOffset: undefined, 
	yOffset: undefined,
	// test: {x:40, y:40},
	

	init: function(){
		this.btnRadius = 140-(this.margin*2),
		this.setStatus();
		// console.log("table.init() called");
		this.initEvents();
		this.initCanvas();
		this.initTimer();
	},
	initEvents: function(){
		window.addEventListener("touchstart", $.proxy(this.doTouchStart, this), false);
		window.addEventListener("mousedown", $.proxy(this.doTouchStart, this), false);
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
	setStatus: function(){
		$('footer div#status').text("select level of effort");
	},
	pressedCheck: function(e){
		// console.log(e.pageX+" "+e.clientX);
		var obj; 
		var rect = this.c.getBoundingClientRect();
		var clickPt = {x:e.clientX - rect.left, y:e.clientY - rect.top};
		// console.log(bbb.x+" <> "+bbb.y);
		// console.log(this.xOffset+" "+this.btnRadius+" "+e.clientX);
		// var clickPt = {x:e.pageX-this.xOffset-(this.btnRadius*2), y:e.pageY};
		var dist;
		// this.test = {x: e.pageX-this.xOffset, y:e.pageY};
		for (var i = 0; i < this.btnArr.length; i++) {
			obj = this.btnArr[i];

			dist = this.checkDist(obj, clickPt);
			//console.log(clickPt.y+" "+obj.y);
			// console.log(i+": "+dist+"  "+this.btnRadius);
			if(dist < this.btnRadius/3){
				//hit
				obj.isClicked = true;
				var score = this.fibNums[obj.i];
				this.handleScoreSelect(score);

				// console.log('click '+this.fibNums[obj.i]);
			}else{
				obj.isClicked = false;
			}
		}
	},
	handleScoreSelect: function(value) {
		// console.log('you selected', value);
		PokerServer.player.showHand(value);
		scrumapp.setView("progress");
	},
	doTouchStart: function(e){
		//console.log("pressed");
		e.preventDefault();	
		this.pressedCheck(e);
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
		var gridCount = this.gridCount, 
		btnRadius = this.btnRadius, 
		buttonCount = this.buttonCount,
		headerSize = this.headerSize,
		w = this.w, 
		h = this.h;
		//
		this.gridW = ((buttonCount-1)%gridCount)*btnRadius;
		this.gridH = Math.floor((buttonCount-1)/gridCount)*btnRadius;
		this.xOffset = w/2-(this.gridW/2);
		// console.log(this.xOffset);
		this.yOffset = h/2-(this.gridH/2) + headerSize;
		for(var i=0; i<buttonCount; i++){
			var obj = {
				i:i,
				isClicked: false
			};
			obj.x = (i%gridCount)*btnRadius+ this.xOffset;
			obj.y = Math.floor(i/gridCount)* btnRadius + this.yOffset;
			this.btnArr.push(obj);
		}
	},
	draw: function(){
		var ctx = this.ctx;
		//console.log('draw()');
		ctx.clearRect(0,0,this.w, this.h);
		
		
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
		// ctx.arc(this.test.x, this.test.y, 10, 0, Math.PI*2);
		// ctx.fillStyle = '#f00';
		// ctx.fill();
		

	}
}

