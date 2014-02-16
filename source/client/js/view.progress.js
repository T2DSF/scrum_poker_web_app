scrumapp.views["progress"] = {
	
	c: undefined,
	ctx: undefined,
	fontSize: 30,
	

	init: function(){
		$('#endHand').bind('click', $.proxy(this.endHand, this));
		this.setStatus();
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
		PokerServer.dealer.endHand();
	},
	setStatus: function(){
		$('footer div#status').text("hurry up you guys...");
	},
	// callback when a player makes a selection
	handleHandProgress: function(percent) {
		console.log("hand progress", percent);
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

		var centerX = Math.floor(canvas.width / 2);
    	var centerY = Math.floor(canvas.height / 2)-50;
    	var radius = Math.floor(canvas.width / 2)*.8;

	    var arcSpanRadians = this.degreesToRadians(arcSpan);
    	var endingAngle = startingAngle + arcSpanRadians;
    	ctx.clearRect(0,0,canvas.width, canvas.height);
	    ctx.beginPath();
	    
	    ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
	    ctx.fillStyle = "#494949";
	    // ctx.fillStyle = "rgba(0,0,0,.2)";
	    ctx.fill();
	    ctx.closePath();

	    ctx.beginPath();
	    ctx.moveTo(centerX, centerY);
	    ctx.arc(centerX, centerY, radius*.9, 
	                startingAngle, endingAngle, false);
	    ctx.closePath();

	    ctx.fillStyle = '#fb1e60';
	    ctx.fill();

	},
	degreesToRadians: function(degrees) {
    	return (degrees * Math.PI)/180;
	}
	
}

