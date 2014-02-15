scrumapp.views["progress"] = {
	
	c: undefined,
	ctx: undefined,
	fontSize: 30,
	

	init: function(){
		$('#endHand').bind('click', $.proxy(this.endHand, this));
		this.setStatus();
		// console.log("table.init() called");
		this.initCanvas();
		this.initTimer();
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
	draw: function(){
		var segmentSize = 360/7;
		var ctx = this.ctx;
		var canvas = this.c;

		var centerX = Math.floor(canvas.width / 2);
    	var centerY = Math.floor(canvas.height / 2)-50;
    	var radius = Math.floor(canvas.width / 2)*.8;

	    var startingAngle = 270;
    	var arcSize = this.degreesToRadians(segmentSize*2);
    	var endingAngle = startingAngle + arcSize;
    	ctx.clearRect(0,0,canvas.width, canvas.height);
	    ctx.beginPath();
	    
	    ctx.arc(centerX, centerY, radius, 0, Math.PI*2);
	    ctx.fillStyle = "#ccc";
	    ctx.fill();
	    ctx.closePath();

	    ctx.beginPath();
	    ctx.moveTo(centerX, centerY);
	    ctx.arc(centerX, centerY, radius, 
	                startingAngle, endingAngle, false);
	    ctx.closePath();

	    ctx.fillStyle = '#fb1e60';
	    ctx.fill();

	},
	degreesToRadians: function(degrees) {
    	return (degrees * Math.PI)/180;
	}
	
}

