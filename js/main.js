var element = function(id){
    return document.getElementById(id);
}
var e_class = function(id){
    return document.getElementsByClassName(id);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

frame();

var e_next = element('next_id');
e_next.setAttribute('onmouseover',"style.backgroundColor = '#009933'");
e_next.setAttribute('onmouseout',"style.backgroundColor = '#00b33c'");

var e_pre = element('pre_id');
e_pre.setAttribute('onmouseover',"style.backgroundColor = '#a6a6a6'");
e_pre.setAttribute('onmouseout',"style.backgroundColor = '#bfbfbf'");

var e_start_stop = element('start_stop');
e_start_stop.setAttribute('onmouseover',"style.color = '#ffff00'");
e_start_stop.setAttribute('onmouseout',"style.color = '#ffffcc'");
e_start_stop.style.display = 'none';

function main(text){
    if (typeof count === 'undefined'){count = 0;}
    if (text){
    	count = Math.min(count+1,6);
    }
    else{
    	count = Math.max(count-1,0);
    }
    element('start_stop').style.display = 'none';
    if (count===6){
    	element('start_stop').style.display = 'block';
    }

    frame();
}

function frame(){
    canvas = element('frame');

    Npin = 200;
    R = canvas.width/2;
    Xh = Array(Npin).fill(0);
    Yh = Array(Npin).fill(0);
    Xl = Array(Npin).fill(0);
    Yl = Array(Npin).fill(0);
    Xc = Array(Npin).fill(0);
    Yc = Array(Npin).fill(0);
    s1=0.98; 
    s2=0.85; 
    s3=0.75;

    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(R,(1-s1)*R);

    for (var i=0; i<Npin; i++){
        fi = (2*i)*Math.PI/Npin;
        gi = (2*i+1)*Math.PI/Npin;
        fi = fi-Math.PI/2;
        gi = gi-Math.PI/2;
　      Xh[i] = R+R*s1*Math.cos(fi);
        Yh[i] = R+R*s1*Math.sin(fi);
        Xl[i] = R+R*s2*Math.cos(gi);
        Yl[i] = R+R*s2*Math.sin(gi);
        Xc[i] = R+R*s3*Math.cos(fi);
        Yc[i] = R+R*s3*Math.sin(fi);
        ctx.lineTo(Xh[i],Yh[i]);
        ctx.lineTo(Xl[i],Yl[i]);
    }
    ctx.lineTo(R,(1-s1)*R);
    ctx.fillStyle = '#000000';
    ctx.fill();
    circle();
    pin();
}

function pin(){
    if (typeof count === 'undefined'){return;}
    if (count>=1){
    	var p = '#ffffff';
    	var q = '#99004d';
        draw_pin(50,p);draw_pin(100,p);draw_pin(150,p);draw_pin(200,p);
        if (count===1){
            number(50,p,q);number(100,p,q);number(150,p,q); number(200,p,q);
            text('50, 100, 150, 200',p,q);
        }
        draw_triangle(50,'#00cc00');
        draw_triangle(100,'#ff6600');
        draw_triangle(150,'#00cc00');
    }
    if (count>=2){
    	var p = '#00cc00';
    	var q = '#000000';
        draw_pin(10,p);draw_pin(40,p);draw_pin(60,p);draw_pin(90,p);
        draw_pin(110,p);draw_pin(140,p);draw_pin(160,p);draw_pin(190,p);
        if (count===2){ 
            number(10,p,q);number(40,p,q); number(60,p,q); number(90,p,q);
            number(110,p,q);number(140,p,q); number(160,p,q); number(190,p,q);
            text('_1_ , _4_ , _6_ , _9_',p,q);
        }
    }
    if (count>=3){
    	var p = '#ffff00';
    	var q = '#cc5200';
        draw_pin(20,p);draw_pin(70,p);draw_pin(120,p);draw_pin(170,p);
        if (count===3){
            number(20,p,q);number(70,p,q); number(120,p,q); number(170,p,q);
            text('_2_ , _7_',p,q);
        }
    }
    if (count>=4){
    	var p = '#ff6600';
    	var q = '#b32400';
        draw_pin(30,p);draw_pin(80,p);draw_pin(130,p);draw_pin(180,p);
        if (count===4){
            number(30,p,q);number(80,p,q); number(130,p,q); number(180,p,q);
            text('_3_ , _8_',p,q);
        }
    }
    if (count>=5){
    	var p = '#5c5cd6';
    	var q = '#191966';
        for (var i=0; i<Npin/10; i++){
            draw_pin(10*(i+0.5),p);
            if (count===5){number(10*(i+0.5),p,q);}
        }
        if (count===5){text('_ _ 5',p,q);}
    }
}

function draw_pin(num,color){
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 0.2;
    ctx.beginPath();
    if (num != Npin){
        ctx.moveTo(Xh[num],Yh[num]);
        ctx.lineTo(Xl[num],Yl[num]);
        ctx.lineTo(Xc[num],Yc[num]);
        ctx.lineTo(Xl[num-1],Yl[num-1]);
        ctx.lineTo(Xh[num],Yh[num]);
    }else{
        ctx.moveTo(Xh[0],Yh[0]);
        ctx.lineTo(Xl[0],Yl[0]);
        ctx.lineTo(Xc[0],Yc[0]);
        ctx.lineTo(Xl[Npin-1],Yl[Npin-1]);
        ctx.lineTo(Xh[0],Yh[0]);
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function draw_triangle(num,color){
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(Xl[num],Yl[num]);
    ctx.lineTo(Xc[num],Yc[num]);
    ctx.lineTo(Xl[num-1],Yl[num-1]);
    ctx.fillStyle = color;
    ctx.fill();
}

function circle(){
    var ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo((1+s3)*R,R);
    ctx.arc(R, R, s3*R, 0, 2*Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
}

function number(i,color_p,color_q){
    var ctx = canvas.getContext('2d');
    var fi = (2*i)*Math.PI/Npin-Math.PI/2;
    var x = R+R*s3*0.94*Math.cos(fi);
    var y = R+R*s3*0.94*Math.sin(fi);
    ctx.font = '1vw Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color_q;
    ctx.shadowColor = color_q;
    if (count===1){ctx.shadowBlur = 3.5;}
    if (count===3){ctx.shadowBlur = 3.5;}
    ctx.fillText(i, x, y+1);
    ctx.fillStyle = color_p;
    ctx.fillText(i, x, y);
    ctx.shadowBlur = 0;
}

function text(center_text,color_p,color_q){
    var ctx = canvas.getContext('2d');
    ctx.font = '2vw Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color_q;
    ctx.shadowColor = color_q;
    if (count===1){ctx.shadowBlur = 2;}
    if (count===3){ctx.shadowBlur = 2.5;}
    ctx.fillText(center_text, R, R+2);
    ctx.fillStyle = color_p;
    ctx.fillText(center_text, R, R);
    ctx.shadowBlur = 0;
}

function start(){
	frame();
	random(true);
}

function random(mode){
	if (mode){n_rand = Math.floor(Math.random()*Npin)+1;}
	var ctx = canvas.getContext('2d');
	ctx.font = '4vw Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000066';
    ctx.fillText(n_rand, R, 0.8*R);
}

element('frame').onmousemove = function(e){
	var rect = this.getBoundingClientRect();
	var r = (rect.right-rect.left)/2;
	var x = e.clientX-rect.left;
	var y = e.clientY-rect.top;
	var d = Math.pow(x-r,2)+Math.pow(y-r,2);

	if (d<Math.pow(s1*r,2) && d>Math.pow(s3*r,2)){
		this.style.cursor = 'pointer';
	}else{
		this.style.cursor = 'auto';
	}

	this.onmousedown = function(e){
		var theta = Math.atan((x-r)/(r-y));
		theta = theta*180/Math.PI;
		if (y-r>0){
			theta = 180+theta;
		}
		else if (x-r<0){
			theta = 360+theta;
		}
		if (d<Math.pow(s1*r,2) && d>Math.pow(s3*r,2)){
			var pin = Math.round(Npin*(theta/360))+1;
			if (Math.abs(pin-n_rand)<5) {good();}
			else                        {oops();}
		}
	}
}

async function good(){
	frame();
	random(true);
	var ctx = canvas.getContext('2d');
	ctx.font = '5vw Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#001a09';
    ctx.fillText('Good', R+2, 1.2*R+2);
    ctx.fillStyle = '#00b33c';
    ctx.fillText('Good', R, 1.2*R);
    sound('good');
    await sleep(1000);
    frame();
    random(false);
}

async function oops(){
	frame();
	random(true);
	var ctx = canvas.getContext('2d');
	ctx.font = '5vw Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#800000';
    ctx.fillText('Oops', R+2, 1.2*R+2);
    ctx.fillStyle = '#ff0000';
    ctx.fillText('Oops', R, 1.2*R);
    sound('oops');
    await sleep(1000);
    frame();
	random(false);
}

function sound(n){
    var path='resource/sound/';
    if(typeof level==='undefined'){level=0; level_fall=true;}
    if (n==='oops'){
  	    var sound = new Howl({src: [path+'error.wav']})
  	    sound.play(); level=0;
    }
    if (n==='good'){
    	switch (level){
    		case 0:
    			var sound = new Howl({src: [path+'level_0.wav']})
    			level=1; level_fall=false; break;
    		case 1:
    			var sound = new Howl({src: [path+'level_1.wav']})
    			level=2; level_fall=false; break;
    		case 2:
    			var sound = new Howl({src: [path+'level_2.wav']})
    			level_fall=false; break;
    	}
  	    sound.play();
    }
}