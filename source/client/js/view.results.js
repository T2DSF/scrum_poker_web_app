scrumapp.views["results"] = {
	
	c: undefined,
	ctx: undefined,
	fontSize: 30,
	

	init: function(){
		$('#restartHand').bind('click', $.proxy(this.restartHand, this));
		this.setStatus();
		if(PokerServer.clientType == "dealer"){
			$("#restartHand").removeClass('hidden');
		}else{
			$("#restartHand").addClass('hidden');
		}
		// console.log("table.init() called");
		this.initCanvas();
		// this.initTimer();
	},
	initCanvas: function(){	
		this.c = document.getElementById('resultscanvas');
		this.ctx = this.c.getContext('2d');
		this.ctx.font = this.fontSize+'pt '+'universcondensed';
		this.ctx.textAlign = "center";
	},
	initTimer: function(){
        // window.requestAnimationFrame($.proxy(this.initTimer, this));
        // this.draw();
	},
	restartHand: function(e){
		//scrumapp.setView("table");
		PokerServer.dealer.startHand();
	},
	setStatus: function(){
		$('footer div#status').text("results are in...");
	},
	drawResults: function(handData){
		var average = this.getAverageVote(handData.players);
		var total = this.getTotalVotes(handData.players);
		var fontSize = 999;
		console.log(handData);

		var ctx = this.ctx;
		var canvas = this.c;

		ctx.clearRect(0,0,canvas.width, canvas.height);
	    
	    var square1 = {x:14, y:50, w:290, h:190};
	    var square2 = {x:14, y:250, w:140, h:120};
	    var square3 = {x:164, y:250, w:140, h:120};
	    var square4 = {x:14, y:380, w:140, h:70};
	    var square5 = {x:164, y:380, w:140, h:70};

	    this.drawBGSquare(ctx, square1);
	    this.drawBGSquare(ctx, square2);
	    this.drawBGSquare(ctx, square3);
	    this.drawBGSquare(ctx, square4);
	    this.drawBGSquare(ctx, square5);

	    var titleSize = 12;

	    var textObj1 = {
	    	font:  titleSize+'pt '+'universcondensed',
	    	textAlign: "center",
	    	x: canvas.width/2,
	    	y: 70,
	    	msg: "group mode",
	    	fillStyle: scrumapp.colors.color3
	    		
	    };
	    this.drawText(ctx, textObj1);

	    var textObj2 = {
	    	font:  142+'pt '+'universcondensed',
	    	textAlign: "center",
	    	x: canvas.width/2,
	    	y: 220,
	    	msg: average,
	    	fillStyle: scrumapp.colors.color2
	    		
	    };
	    this.drawText(ctx, textObj2);

	    var textObj3 = {
	    	font:  titleSize+'pt '+'universcondensed',
	    	textAlign: "center",
	    	x: 84,
	    	y: 270,
	    	msg: "your selection",
	    	fillStyle: scrumapp.colors.color3
	    		
	    };
	    this.drawText(ctx, textObj3);

	    var textObj4 = {
	    	font:  72+'pt '+'universcondensed',
	    	textAlign: "center",
	    	x: 84,
	    	y: 350,
	    	msg: scrumapp.curScore,
	    	fillStyle: scrumapp.colors.color4
	    		
	    };
	    this.drawText(ctx, textObj4);

	    var textObj5 = {
	    	font:  titleSize+'pt '+'universcondensed',
	    	textAlign: "center",
	    	x: 234,
	    	y: 270,
	    	msg: "total votes",
	    	fillStyle: scrumapp.colors.color3
	    		
	    };
	    this.drawText(ctx, textObj5);

	    var textObj6 = {
	    	font:  72+'pt '+'universcondensed',
	    	textAlign: "center",
	    	x: 234,
	    	y: 350,
	    	msg: total,
	    	fillStyle: scrumapp.colors.color4
	    		
	    };
	    this.drawText(ctx, textObj6);
	},
	drawBGSquare: function(ctx, obj){
		var imageObj = new Image();
      	imageObj.onload = function() {
        	var pattern = ctx.createPattern(imageObj, 'repeat');

	        ctx.rect(obj.x, obj.y, obj.w, obj.h);
	        ctx.fillStyle = pattern;
	        ctx.fill();
	      };
      imageObj.src = 'img/bg_pat.png';
	},
	drawText: function(ctx, t){
		ctx.font = t.font;
		ctx.textAlign = t.textAlign;
	    ctx.fillStyle = t.fillStyle;
		//
		ctx.fillText(t.msg, t.x, t.y);
	},
	getAverageVote: function(data){
		var sum = 0;
		var items = 0;
		for (var i = 0; i < data.length; i++) {
			sum = sum+Number(data[i].handValue);
			items++;
		}
		console.log(sum+" "+items);
		var ave = sum/items;
		//to keep one decimal place
		ave = Math.round(ave * 10) / 10;
		return ave;
	},
	getTotalVotes:function(data){
		var items = 0;
		for (var i = 0; i < data.length; i++) {
			items++;
		}
		return items;
	},
	degreesToRadians: function(degrees) {
    	return (degrees * Math.PI)/180;
	}
	
}

