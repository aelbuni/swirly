swirly
======

Zero byte graciful and dynamic loading/waiting motion generator for HTML by jQuery.

﻿Swirly v1.0.1
=======

Here is the Swirly official page [Demo](http://www.itechflare.com/swirly "Swirly page").
----------------------------

Features
-----------
* No images, no external CSS
* Get dynamic symmetrical motions with cool patterns that inspired by: Lissajous patterns in Oscilloscope
* Require jQuery only
* Highly configurable
* Resolution independent
* Uses "requestAnimationFrame" animations rather than "setInterval". The reasons:.
 * The browser can optimize it, so animations will be smoother
 * Animations in inactive tabs will stop, allowing the CPU to chill
 * More battery-friendly
* Works in all major browsers, including IE6
* GPLv2 License


After imcluding jQuery and Swirly java scripts int your website.
```
// Setup your options, which can be generated from the demo shown above
options = {
	phaseShift:90,
	swirlySize:28,
	reverseX:-1,
	reverseY:-1,
	initialX:65,
	initialY:65,
	frequencyX:2100,
	frequencyY:2240,
	offset:10,
	scale: 40,
	colors:['red','green'] // Customize colors of the two swirlies
};
 
// Execute swirly on the specified element
var interval = $("#your-target-div").swirly(options);
```
Remove or Hide
-----------
You can test the effect of stop, play and remove using the button shown above at the swirly generator

```
// To hide and show use the regular jquery toggle
$("#your-target-div").toggle();
 
// To completely remove the swirly loading motion
$("#your-target-div").remove(interval, $("#your-target-div"));
	
```

Positioning
-----------
The swirly loading motion is absolutely positioned at 50% of its offset parent. However, always you can use "initialX" and "initialY" to adjust the motion positioning.
