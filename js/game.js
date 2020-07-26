var l, b = [], expl, s = 0, liv = 3, g = true;
expl = document.getElementById('explosive');
function setup(){
	createCanvas(window.innerWidth,window.innerHeight-4);
	angleMode(DEGREES);
	rectMode(CENTER);
	l=new Launcher(-75,0);
}
function Launcher(x,y){
	this.pos=createVector(x,y);
	this.e=[];
	this.b=[];
	this.draw=function(){
		push();
		stroke(255,150);
		strokeWeight(20);
		translate(width/2,height-10);
		rotate(this.ang);
		line(0,0,this.pos.x,this.pos.y);
		pop();
	}
	this.update=function(){
		this.ang=map(mouseX,0,width,0,180);
		for(var i = this.b.length - 1; i >= 0; i--){
			this.b[i].update();
			if(this.b[i].isDone())
				this.b.splice(i, 1);
			else
				this.collision(this.b[i], i);
		}
		for(var i = this.e.length - 1; i >= 0;i--){
			this.e[i].update();
			if(this.e[i].isDone()){
				this.e.splice(i,1);
				if(liv>0)
					liv-=1;
				if(liv==0)
					g=false;
			}
			if(!g){
				this.e.splice(i,this.e.length);
			}
		}
		this.collision=function(m,j){
			for(var i=this.e.length-1;i>=0;i--){
				var en=this.e[i];
				if(m.pos.x+m.r>en.pos.x-(en.w/2)&&m.pos.x-m.r<en.pos.x+(en.w/2)&&m.pos.y-m.r<en.pos.y+(en.h/2)&&m.pos.y+m.r>en.pos.y-(en.h/2)){
					this.b.splice(j,1);
					this.e.splice(i,1);
					expl.play();
					s+=1;
				}
			}
		}
		this.draw();
	}
}
function Ball(x,y,d){
	this.pos=createVector(x,y);
	this.vel=createVector(0,0);
	this.d=d;
	this.r=(8*this.d);
	this.ang = map(mouseX,0,width,180,0);
	this.draw=function(){
		fill(255);
		ellipse(this.pos.x,this.pos.y,this.d);
	}
	this.update=function(){
		this.ang = map(mouseX,0,width,180,0);
		this.pos.add(this.vel);
		this.draw();
	}
	this.isDone=function(){
		return (this.pos.y<0||this.pos.x>width||this.pos.x<0);
	}
}
function Enemy(x,y,w,h){
	this.pos=createVector(x,y);
	this.vel=createVector(0,random(1,3));
	this.w=w;
	this.h=h;
	this.draw=function(){
		stroke(255);
		rect(this.pos.x,this.pos.y,this.w,this.h);
	}
	this.update=function(){
		this.pos.add(this.vel);
		this.draw();
	}
	this.isDone=function(){
		return (this.pos.y>height);
	}
}
function mouseClicked(){
	l.b.push(new Ball(width/2,height-10,2));
	for(let i = l.b.length - 1; i >= 0; i--){
		if(l.b[i].pos.x == width / 2 && l.b[i].pos.y == height - 10){
			l.b[i].vel.y =- sin(l.b[i].ang) * 25;
		    l.b[i].vel.x = cos(l.b[i].ang) * 25;
		}
	}
}
function score(){
	push();
	fill(255,0,0,230);
	noStroke();
	textSize(35);
	text("Score"+" "+s,20,50);
	pop();
	lives();
}
function lives(){
	push();
	fill(255,0,0,230);
	noStroke();
	textSize(35);
	text("Lives"+" "+liv,width-125,50);
	pop();
}
function gameOver(){
	push();
	fill(255,0,0);
	noStroke();
	textSize(100);
	text("Game Over", width / 2 - 250, height / 2);
	textSize(30);
	text("Press 'R' to Play Again!", width / 2 - 150, height / 2 + 50);
	pop();
}

function reset(){
	g = true
	liv = 3
	s = 0
}

function draw(){
	background(51);
	score();
	if(!g){
		gameOver();
	}
	l.update();
	if(random(1)<0.01&&g){
		l.e.push(new Enemy(random(20,width-20),-20,random(10,30),random(10,30)));
	}
	stroke(255);
	strokeWeight(15);
	point(width/2,height-10);
}
function keyPressed(){
	if(key == 'r' && !g)
		reset()
}