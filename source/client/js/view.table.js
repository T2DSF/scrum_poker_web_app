scrumapp.views["table"] = {
	
	c: undefined,
	ctx: undefined,
	fibNums: ["0", ".5", "1", "2", "3", "5", "8", "13", "20"],
	fontSize: 30,
	gridCount: 3,
	buttonCount: 9,
	btnArr: [],
	margin: 20,
	itemRadius:undefined,
	btnRad: undefined,
	w: 320,
	h: 480,
	gridW: undefined, 
	gridH: undefined,
	headerSize: 40,
	xOffset: undefined, 
	yOffset: undefined,
	firstRun: true,
	// test: {x:40, y:40},
	

	init: function(){
		this.itemRadius = 140-(this.margin*2),
		this.btnRad = this.itemRadius/2.7;
		this.setStatus();
		// console.log("table.init() called "+ this.fibNums);
		this.initEvents();
		if(this.firstRun){
			this.initCanvas();
			this.initTimer();
			this.firstRun = false;
		}
	},
	initEvents: function(){
		$(window).bind('mousedown touchstart', $.proxy(this.handleClick, this));
		$(window).bind('mousemove', $.proxy(this.handleMouseMove, this));
		
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
	// callback when the dealer starts a new hand
	handleHandBegin: function(issueNumber) {
		console.log("hand begin", issueNumber);
		scrumapp.setView("table");
	},
	pressedCheck: function(event){
		// console.log("pressedCheck() "+event.type);
		
		var obj; 
		var rect = this.c.getBoundingClientRect();
		var eClickXY = this.getXYFromEvent(event);
		var clickPt = {x:eClickXY.x - rect.left, y:eClickXY.y - rect.top};
		// console.log(clickPt.x+" "+clickPt.y+" rectleft: "+rect.left+" recttop: "+rect.top);
		// var clickPt = {x:e.pageX-this.xOffset-(this.itemRadius*2), y:e.pageY};
		var dist;
		// this.test = {x: e.pageX-this.xOffset, y:e.pageY};
		for (var i = 0; i < this.btnArr.length; i++) {
			obj = this.btnArr[i];

		dist = this.checkDist(obj, clickPt);
/*				var ctx = this.ctx;
			 ctx.beginPath();
			ctx.arc(obj.x, obj.y, this.btnRad, 0, Math.PI*2);
			ctx.fillStyle = '#f00';
			ctx.fill();
*/


			if(dist < this.btnRad){
				obj.isClicked = true;
				if(event.type == "mousedown" || event.type == "touchstart"){
					var score = this.fibNums[obj.i];
					scrumapp.curScore = score;
					this.handleScoreSelected(score);
				}
			}else{
				obj.isClicked = false;
			}
		}
	},
	handleScoreSelected: function(value) {
		// console.log('you selected', value);
		$(window).unbind('mousedown touchstart', $.proxy(this.handleClick, this));
		PokerServer.player.showHand(value);
		scrumapp.setView("progress");
	},
	handleMouseMove:function(event){
		event.preventDefault();	
		this.pressedCheck(event);
	},
	handleClick: function(e){
		console.log("pressed");
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
		itemRadius = this.itemRadius, 
		buttonCount = this.buttonCount,
		headerSize = this.headerSize,
		w = this.w, 
		h = this.h;
		//
		this.gridW = ((buttonCount-1)%gridCount)*itemRadius;
		this.gridH = Math.floor((buttonCount-1)/gridCount)*itemRadius;
		this.xOffset = w/2-(this.gridW/2);
		// console.log(this.xOffset);
		this.yOffset = h/2-(this.gridH/2);
		for(var i=0; i<buttonCount; i++){
			var obj = {
				i:i,
				isClicked: false
			};
			obj.x = (i%gridCount)*itemRadius+ this.xOffset;
			obj.y = Math.floor(i/gridCount)* itemRadius + this.yOffset;
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
			ctx.arc(obj.x, obj.y, this.btnRad, 0, Math.PI*2);
			
			if(obj.isClicked){
				ctx.fillStyle = scrumapp.colors.color2;	
			}else{
				ctx.fillStyle = scrumapp.colors.color4;
			}
			
			ctx.fill();

			
			if(obj.isClicked){
				ctx.fillStyle = scrumapp.colors.color4;
			}else{
				ctx.fillStyle = scrumapp.colors.color1;
			}
			ctx.fillText(this.fibNums[i], obj.x, obj.y + this.fontSize/2);

		}

		// ctx.beginPath();
		// ctx.arc(this.test.x, this.test.y, 10, 0, Math.PI*2);
		// ctx.fillStyle = '#f00';
		// ctx.fill();
		

	},
	getXYFromEvent: function(event) {
		// console.log(event);
		var x, y;
		if(event.originalEvent.hasOwnProperty('changedTouches')) {
			x = event.originalEvent.changedTouches[0].pageX;
			y = event.originalEvent.changedTouches[0].pageY;
		} else {
			x = event.originalEvent.pageX;
			y = event.originalEvent.pageY;
		}

		return { x: x, y: y };
	}

}

