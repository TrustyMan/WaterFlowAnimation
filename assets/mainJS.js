$('input[type="range"]').rangeslider({polyfill: false});

var Vin = 50, Vout = 50, D=100, d=30;
var start_x=50, start_y=50, h_length = 400;
var arrow_offset = D/4, arrow_width = 30;
var arrow_start_x = start_x + 5, arrow_start_y1 = start_y + arrow_offset, arrow_start_y2 = start_y + arrow_offset*2, arrow_start_y3 = start_y + arrow_offset*3;
var d_slider_input, Vin_slider_input, Vout_slider_input;
var h = 350 + D - (D-d)/2;
var t = Math.sqrt(2 * h/10);
var L = Vout * t;
var callback = function(){
	// Handler when the DOM is fully loaded
	drawing();
	setInterval(arrow_change, 100);
	console.log("adsfasdf");
	window.addEventListener("resize",drawing,false);
	d_slider_input = document.getElementById('d_slider_input');
	Vin_slider_input =document.getElementById('Vin_slider_input');
	Vout_slider_input =document.getElementById('Vout_slider_input');
};
var arrow_change = function(){
	console.log(Vin);
	arrow_start_x += Vin;
	if(arrow_start_x - start_x - 5 > h_length ) arrow_start_x = start_x + 5;
	// console.log("VIn", Vin);
	drawing();
}
var drawing = function(){
	var s = document.getElementById("svg");

	var snap = Snap("#svg");
	// var gradient = snap.gradient("L(0%, 0%, 100%, 100%) rgb(100,100,100) rgb(150,150,150) rgb(255,255,255) rgb(150,150,150) rgb(100,100,100)");
	// gradient.setStops("rgb(100,100,100)-rgb(150,150,150)-rgb(255,255,255)-rgb(150,150,150)-rgb(100,100,100)");
	snap.attr({ viewBox: "0 0 1600 400"});
	snap.rect(0, 0, 1600, 400).attr({
		fill: "white"
	});
	var grad = snap.gradient("l(0, 0, 0, 1)#000-#fff-#000");

	var f = Snap.format("M{start_x} {start_y} L{line_to_x} {line_to_y1}, {hose_end_x1} {hose_end_y1}, {hose_end_x1} {hose_end_y2}, {line_to_x} {line_to_y2}, {start_x} {line_to_y2}, {start_x} {start_y}", {
	    start_x: start_x,
	    start_y: start_y,
	    line_to_x: start_x + h_length,
	    line_to_y1: start_y,
	    line_to_y2: start_y + D,
	    hose_end_x1: start_x + h_length + D,
	    hose_end_y1: start_y + (D-d)/2,
	    hose_end_y2: start_y + (D+d)/2
	});
	// t="translate("+(x-x1)+","+(y-y1)+")"
 //        el.setAttribute('transform',t);
	var f1 = Snap.format("M{arrow_start_x} {arrow_start_y1} L{arrow_end_x} {arrow_start_y1} M{arrow_pick_x1} {arrow_pick_y1} L{arrow_end_x} {arrow_start_y1} M{arrow_pick_x1} {arrow_pick_y2} L{arrow_end_x}, {arrow_start_y1}", {
		arrow_start_x: arrow_start_x,
		arrow_start_y1: arrow_start_y1,
		arrow_end_x: arrow_start_x + arrow_width,
		arrow_pick_x1: arrow_start_x + arrow_width -5,
		arrow_pick_y1: arrow_start_y1 - 2,
		arrow_pick_y2: arrow_start_y1 + 2
	});
	var f2 = Snap.format("M{arrow_start_x} {arrow_start_y2} L{arrow_end_x} {arrow_start_y2} M{arrow_pick_x1} {arrow_pick_y1} L{arrow_end_x} {arrow_start_y2} M{arrow_pick_x1} {arrow_pick_y2}L{arrow_end_x} {arrow_start_y2}", {
		arrow_start_x: arrow_start_x,
		arrow_start_y2: arrow_start_y2,
		arrow_end_x: arrow_start_x + arrow_width,
		arrow_pick_x1: arrow_start_x + arrow_width -5,
		arrow_pick_y1: arrow_start_y2 - 2,
		arrow_pick_y2: arrow_start_y2 + 2
	});
	var f3 = Snap.format("M{arrow_start_x} {arrow_start_y3} L{arrow_end_x} {arrow_start_y3} M{arrow_pick_x1} {arrow_pick_y1} L{arrow_end_x} {arrow_start_y3} M{arrow_pick_x1} {arrow_pick_y2}L{arrow_end_x} {arrow_start_y3}", {
		arrow_start_x: arrow_start_x,
		arrow_start_y3: arrow_start_y3,
		arrow_end_x: arrow_start_x + arrow_width,
		arrow_pick_x1: arrow_start_x + arrow_width -5,
		arrow_pick_y1: arrow_start_y3 - 2,
		arrow_pick_y2: arrow_start_y3 + 2
	});

	var svg_path = snap.path(f);
	var svg_path2 = snap.path(f1);
	var svg_path3 = snap.path(f2);
	var svg_path4 = snap.path(f3);
	svg_path2.attr({stroke: "black", strokeWidth: 2});
	svg_path3.attr({stroke: "black", strokeWidth: 2});
	svg_path4.attr({stroke: "black", strokeWidth: 2});
	svg_path.attr({
		fill: grad
    });
	// console.log(f);
	//console.log("snap:", svg_path);
	// svg_path.fill = "url(#metal)";
	h = 350 + D - (D-d)/2;
	t = Math.sqrt(2 * h/10);
	L = Vout * t;
	//DRAWING
	f = Snap.format("M{curve2_x3} {curve2_y3} C{curve2_x3} {curve2_y3}, {curve2_x2} {curve2_y2}, {curve2_x1} {curve2_y1} ",{
		curve1_x1: start_x + h_length + D,
		curve1_y1: start_y + (D+2*d)/2,
		curve1_x2: start_x + h_length + D + L,
		curve1_y2: start_y + (D+2*d)/2,
		curve1_x3: start_x + h_length + D + L,
		curve1_y3: start_y + 350,
		curve2_x1: start_x + h_length + D,
		curve2_y1: start_y + (D+2*d)/2 - d,
		curve2_x2: start_x + h_length + D + L + d,
		curve2_y2: start_y + (D+2*d)/2,
		curve2_x3: start_x + h_length + D + L + d,
		curve2_y3: start_y + 350,
		line_to_x: start_x + h_length + D,
		line_to_y: start_y + (D+d)/2
	});
 
	var water_path = snap.path(f);
	water_path.attr({stroke: "blue", strokeWidth: 5, fill: "none"});
	// hose_end_x1: start_x + h_length + D,
	//     hose_end_y1: start_y + (D-d)/2,
	//     hose_end_y2: start_y + (D+d)/2
	var radius = (d-5)/2;
	var c_x = start_x+h_length+D, c_y = start_y + (D+2*d)/2 - d;
	// console.log(f);
	var pathLength = Math.floor( water_path.getTotalLength() );
	prcnt = pathLength / radius;
	for(let i = 0; i < prcnt; i++){
		var pt = water_path.getPointAtLength(i*radius);
		// console.log(pt);
		pt.x = Math.round(pt.x);
	 	pt.y = Math.round(pt.y);
		snap.circle(pt.x+radius, pt.y, radius);
	}
	snap.rect(c_x, c_y-radius, radius*2, radius*2);
	snap.attr({fill: "blue"});
}


if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

function ESresize(){
/*
 * Trigger window resize function in javascript
 * source path : http://codrate.com/questions/how-can-trigger-the-window-resize-event-manually-in-javascript
 */
    if (typeof (Event) === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
    } else {
        //This will be executed on old browsers and especially IE
        var resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(resizeEvent);
    }
}
function onVinChange(){
	Vin = parseInt(Vin_slider_input.value);
	console.log(Vin);
	ESresize();
	if(d == 0) Vout = 0;
	else Vout = Vin*100/d;
	drawing();
}

function onVoutChange(){
	Vout = parseInt(Vout_slider_input.value);
	Vin = Vout*d/100;
	ESresize();
	drawing();
}

function ondiameterChange(){
	d = D*parseInt(d_slider_input.value)/100;
	if(d==0) Vout = 0;
	else Vout = Vin*100/d;
	ESresize();
	drawing();
}
