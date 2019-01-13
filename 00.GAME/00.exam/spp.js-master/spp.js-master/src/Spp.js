var SPP = SPP || {
	REVISION : 'Release1.0',
	AUTHOR : "flashhawk",
	BLOG : "flashquake.cn",
	github : "https://github.com/flashhawk",
	weibo : "http://weibo.com/flashawk"
};
SPP.frameTime = 0;
SPP.inherit = function(ctor, superCtor)
{
	ctor.superClass = superCtor;
	ctor.prototype = Object.create(superCtor.prototype);
	ctor.prototype.constructor = ctor;
};
SPP.extend = function(origin, add)
{
	// Don't do anything if add isn't an object
	if (!add || typeof add !== 'object')
		return origin;

	var keys = Object.keys(add);
	var i = keys.length;
	while (i--)
	{
		origin[keys[i]] = add[keys[i]];
	}
	return origin;
};
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function()
{

	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
	{

		window.requestAnimationFrame = window[vendors[x]
				+ 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]
				+ 'CancelAnimationFrame']
				|| window[vendors[x] + 'CancelRequestAnimationFrame'];

	}

	if (window.requestAnimationFrame === undefined)
	{

		window.requestAnimationFrame = function(callback, element)
		{

			var currTime = Date.now(), timeToCall = Math.max(0,
					16 - (currTime - lastTime));
			var id = window.setTimeout(function()
			{
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;

		};

	}

	window.cancelAnimationFrame = window.cancelAnimationFrame || function(id)
	{
		window.clearTimeout(id);
	};

}());
