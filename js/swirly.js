/*
* jQuery swirly Plugin; v20140713
* http://www.itechflare.com/
* Copyright (c) 2014 iTechFlare; Licensed: GPLv2
* Developer: Abdulrhman Mohamed Samir Elbuni
*/

(function( $ ) {	
	
    // The swirly plugin
	$.fn.swirly = function(options) {
		
		var mainNode = this;
		
		// The module pattern
		var swirly = {
			init: function( settings) {
				swirly.config = $.extend($.fn.swirly.defaults, settings);
				swirly.setup();
			},
			setup:function(){
				
				var spansHTML = "";
				var color;
				var colorCount = swirly.config.colors.length;
				
				for(var i=0;i<2;i++)
				{
					color = swirly.config.colors[i%colorCount];
					spansHTML = spansHTML+"<span style='position:relative;left:0px;top:0px;color:"+color+"' class='swirly-circle swirly-"+mainNode.attr("id")+"-"+i+"'>"+swirly.config.text+"</span>";
				}
				
				mainNode.html(spansHTML);
			}
		}
		
		// Initilization
		// Initialize swirly literal
		swirly.init(options);		
		
		var signalX;
		var angleX;
		var singalY;
		var angleY;
		
		var tempX;
		var tempY;
		var timerSpeed = swirly.config.speed;
		var width = swirly.config.initialX;
		var height = swirly.config.initialY;
		
		var time=0;
		var convertShiftPhase;
			
		var motionInterval = requestAnimationFrame(doMotion);
		
		function doMotion()
		{
			// Update position
			width = swirly.config.initialX;
			height = swirly.config.initialY;
		
			mainNode.find("span.swirly-circle").css("font-size",swirly.config.swirlySize);	
			
			// Convert from degree to radians
			convertShiftPhase = swirly.config.phaseShift*Math.PI/180;

			// Building X1 signals
			angleX=((2*Math.PI*time/swirly.config.frequencyX)+convertShiftPhase);
			angleX = angleX%360;
			
			signalX=(swirly.config.scale * Math.sin(angleX));
			signalX += swirly.config.offset;
			
			// Building Y signal
			angleY =(2*Math.PI*time/swirly.config.frequencyY);
			angleY = angleY%360;
			
			signalY =(swirly.config.scale * Math.sin(angleY));
			signalY = swirly.config.scale * Math.sin(angleY);
			signalY += swirly.config.offset;
			
			// Increase the position of two swirly by the width and hieght of their parent node, disregarding the reverse negative value
			if(swirly.config.reverseX == -1) width = Math.abs(width)*-1;
			else width = Math.abs(width);
			if(swirly.config.reverseY == -1) height = Math.abs(height)*-1;
			else height = Math.abs(height);
			
			if(swirly.config.reverseX == -1){
				tempX = (signalX+width)*swirly.config.reverseX;
			}else{
				tempX = (signalX+width);
				signalX = signalX + (width*2) + swirly.config.offset;
			}
			if(swirly.config.reverseY == -1){
				tempY = (signalY+height)*swirly.config.reverseY;
			}else{
				tempY = (signalY+height);
				signalY = signalY + (height*2) + swirly.config.offset;
			}
			
			signalX -= width;
			signalY -= height;
			
			// Animate swirlies
			mainNode.find("span.swirly-"+mainNode.attr("id")+"-0").animate({left:signalX,top:signalY},timerSpeed/2);
			mainNode.find("span.swirly-"+mainNode.attr("id")+"-1").animate({left:tempX,top:tempY},timerSpeed/2);
			
			time = (time+30)%999999;
			
			if(mainNode.children().length == 0)
			{
				cancelAnimationFrame(motionInterval);
			}
			motionInterval = requestAnimationFrame(doMotion);
		}
		
		return motionInterval;
	}
	
	$.fn.swirly.remove = function(interval, elm)
	{
		cancelAnimationFrame(interval);
		$(elm).empty();
	}
	
	$.fn.swirly.defaults = {
		phaseShift:90,
		swirlySize:28,
		frequencyX:2100,
		frequencyY:2240,
		offset:0,
		scale: 40,
		speed:20,
		reverseY:-1,
		reverseX:-1,
		initialX:65,
		initialY:65,
		text: '&#9679;',
		img: '',
		stop: false,
		colors:['black','blue']
	};
})( jQuery );
