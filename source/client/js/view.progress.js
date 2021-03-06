scrumapp.views["progress"] = {
	
	c: undefined,
	ctx: undefined,
	fontSize: 30,
	endPause:true,
	

	init: function(){
		$('#endHand').bind('click', $.proxy(this.endHand, this));
		this.setStatus();

		if(PokerServer.clientType == "dealer"){
			//
		}else{
			$('#endHand').remove();
		}

		// console.log("table.init() called");
		this.initCanvas();
		//this.initTimer();
	},
	initCanvas: function(){	
		this.c = document.getElementById('waitingcanvas');
		this.ctx = this.c.getContext('2d');
		this.ctx.font = this.fontSize+'pt '+'universcondensed';
		this.ctx.textAlign = "center";
	},
	initTimer: function(){
        window.requestAnimationFrame($.proxy(this.initTimer, this));
        this.draw();
	},
	endHand: function(e){
		var self = this;
		if(this.endPause){
			this.endPause = false;
			console.log("endHand");
			PokerServer.dealer.endHand();
		}
		setTimeout(function(){self.endPause = true},2000);
		
	},
	setStatus: function(){
		$('footer div#status').text("hurry up you guys...");
	},
	restart:function(){
		this.draw(0);
	},
	// callback when a player makes a selection
	handleHandProgress: function(percent) {
		var me = scrumapp.views["progress"];
		var p = percent.issueProgress;
		me.draw(p);
		if(p>=1){
			me.endHand();
		}
	},
	// callback when the dealer ends the hand
	handleHandComplete: function(handData) {
		// console.log("hand end", handData);
		scrumapp.setView("results");
		scrumapp.views["results"].drawResults(handData);
	},
	draw: function(percent){
		var pct = percent;
		var arcSpan = (360*pct);
		var startingAngle = this.degreesToRadians(270);
    	
		var ctx = this.ctx;
		var canvas = this.c;
		if(!canvas){
			return false;
		}
		var centerX = Math.floor(canvas.width / 2);
    	var centerY = Math.floor(canvas.height / 2)-100;
    	var radius = Math.floor(canvas.width / 2)*.8;

	    var arcSpanRadians = this.degreesToRadians(arcSpan);
    	var endingAngle = startingAngle + arcSpanRadians;
    	ctx.clearRect(0,0,canvas.width, canvas.height);
	    ctx.beginPath();
	    
	    ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
	    ctx.fillStyle = scrumapp.colors.color3;
	    ctx.fill();
	    ctx.closePath();

	    ctx.beginPath();
	    ctx.moveTo(centerX, centerY);
	    ctx.arc(centerX, centerY, radius*.9, 
	                startingAngle, endingAngle, false);
	    ctx.closePath();

	    ctx.fillStyle = scrumapp.colors.color2;
	    ctx.fill();

	},
	degreesToRadians: function(degrees) {
    	return (degrees * Math.PI)/180;
	}
	
}

