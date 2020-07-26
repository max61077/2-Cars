var d=[],c1,c2,obs,s=0,g=true,gm=true;
function setup(){
	createCanvas(600,windowHeight);
	d[0]=new divider(width/2,3,10);
	d[1]=new divider(width/4,3,4);
	d[2]=new divider(.75*width,3,4);
	c1=new Car(.125*width,height-70,50,85,255,0);
	c2=new Car(.875*width,height-70,50,85,0,255);
	obs=new Obstacles();
}
function divider(x,y,sw){
	this.x=x;
	this.y=y;
	this.sw=sw;
	this.draw=function(){
		push();
		stroke(255);
		strokeWeight(this.sw);
		line(this.x,this.y,this.x,height-4);
		pop();
	}
	this.update=function(){
		this.draw();
	}
}
function Car(x,y,w,h,clr1,clr2){
	this.x=x;
	this.y=y;
	this.w=w/2;
	this.h=h/2;
	this.clr1=clr1;
	this.clr2=clr2;
	this.draw=function(){
		push();
		translate(this.x,this.y);
		stroke(this.clr1,0,this.clr2);
		strokeWeight(5)
		beginShape();
		vertex(-this.w,-this.h);
		vertex(this.w,-this.h);
		vertex(this.w,this.h);
		vertex(-this.w,this.h);
		push();
		beginContour();
		vertex(-this.w/2,-this.h/2);
		vertex(this.w/2,-this.h/2);
		vertex(this.w/2,this.h/2);
		vertex(-this.w/2,this.h/2);
		endContour();
		pop();
		endShape(CLOSE);
		pop();
	}
	this.update=function(){
		this.draw();
	}
}
function Obstacle(x,y,w,h,clr1,clr2){
	this.x=x;
	this.y=y;
	this.w=w/2;
	this.h=h/2;
	this.clr1=clr1;
	this.clr2=clr2;
	this.dy=10;
	this.draw=function(){
		push();
		translate(this.x,this.y);
		stroke(this.clr1,0,this.clr2);
		strokeWeight(5)
		beginShape();
		vertex(-this.w,-this.h);
		vertex(this.w,-this.h);
		vertex(this.w,this.h);
		vertex(-this.w,this.h);
		push();
		beginContour();
		vertex(-this.w/2,-this.h/2);
		vertex(this.w/2,-this.h/2);
		vertex(this.w/2,this.h/2);
		vertex(-this.w/2,this.h/2);
		endContour();
		pop();
		endShape(CLOSE);
		pop();
	}
	this.update=function(){
		this.y+=this.dy;
		this.draw();
	}
	this.isOffScreen=function(){
		return (this.y>height);
	}
	this.collision=function(car){
		if(car)
			return (c1.x+c1.w>this.x-this.w&&c1.x-c1.w<this.x+this.w&&c1.y-c1.h<this.y+this.h&&c1.y+c1.h>this.y-this.h);
		else
			return (c2.x+c2.w>this.x-this.w&&c2.x-c2.w<this.x+this.w&&c2.y-c2.h<this.y+this.h&&c2.y+c2.h>this.y-this.h);
	}
}
function Circle(x,y,d,clr1,clr2){
	this.x=x;
	this.y=y;
	this.d=d;
	this.r=d/2;
	this.clr1=clr1;
	this.clr2=clr2;
	this.dy=10;
	this.draw=function(){
		push();
		noStroke();
		fill(this.clr1,0,this.clr2);
		ellipse(this.x,this.y,this.d);
		fill(255);
		ellipse(this.x,this.y,this.d-10);
		fill(this.clr1,0,this.clr2);
		ellipse(this.x,this.y,this.r-2);
		pop();
	}
	this.update=function(){
		this.y+=this.dy;
		this.draw();
	}
	this.collision=function(car){
		if(car)
			return (c1.x+c1.w>this.x-this.r&&c1.x-c1.w<this.x+this.r&&c1.y-c1.h<this.y+this.r&&c1.y+c1.h>this.y-this.r);
		else
			return (c2.x+c2.w>this.x-this.r&&c2.x-c2.w<this.x+this.r&&c2.y-c2.h<this.y+this.r&&c2.y+c2.h>this.y-this.r);
	}
	this.miss=function(car){
		if(car)
			return (this.y>c1.y+c1.h);
		else
			return (this.y>c2.y+c2.h);
	}
}
function Obstacles(){
	this.obsL=[];
	this.obsR=[];
	this.cirL=[];
	this.cirR=[];
	this.once = function(){
		if(floor(random(10))<5){
			this.obsL.push(new Obstacle(.125*width,-300,50,50,255,0));
			this.cirL.push(new Circle(.125*width,-50,50,255,0));
		}
		else{
			this.obsL.push(new Obstacle(.375*width,-300,50,50,255,0));
			this.cirL.push(new Circle(.375*width,-50,50,255,0));
		}
		if(floor(random(10))<5){
			this.obsR.push(new Obstacle(.625*width,-500,50,50,0,255));
			this.cirR.push(new Circle(.625*width,-300,50,0,255));
		}
		else{
			this.obsR.push(new Obstacle(.875*width,-500,50,50,0,255));
			this.cirR.push(new Circle(.875*width,-300,50,0,255));
		}
	}
	this.update=function(){
		for(var i=this.obsL.length-1;i>=0;i--){
			if(this.obsL[i].y==350){
				if(floor(random(10))<5){
					this.cirL.push(new Circle(.125*width,random(-450,-700),50,255,0));
					this.obsL.push(new Obstacle(.125*width,-300,50,50,255,0));
				}
				else{
					this.cirL.push(new Circle(.375*width,random(-450,-700),50,255,0));	
					this.obsL.push(new Obstacle(.375*width,-300,50,50,255,0));	
				}
			}
			this.obsL[i].update();
			if(this.obsL[i].collision(true))
				g=false;
			if(this.obsL[i].isOffScreen())
				this.obsL.splice(i,1);
		}
		for(var i=this.obsR.length-1;i>=0;i--){
			if(this.obsR[i].y==350){
				if(floor(random(10))<5){
					this.cirR.push(new Circle(.875*width,random(-700,-450),50,0,255));
					this.obsR.push(new Obstacle(.875*width,-300,50,50,0,255));
				}
				else{
					this.cirR.push(new Circle(.625*width,random(-700,-450),50,0,255));	
					this.obsR.push(new Obstacle(.625*width,-300,50,50,0,255));	
				}
			}
			this.obsR[i].update();
			if(this.obsR[i].collision(false))
				g=false;
			if(this.obsR[i].isOffScreen())
				this.obsR.splice(i,1);
		}
		for(var i=this.cirL.length-1;i>=0;i--){
			this.cirL[i].update();
			if(this.cirL[i].collision(true)){
				this.cirL.splice(i,1);
				s+=1;
			}
			else if(this.cirL[i].miss(true))
				g=false;
		}
		for(var i=this.cirR.length-1;i>=0;i--){
			this.cirR[i].update();
			if(this.cirR[i].collision(false)){
				this.cirR.splice(i,1);
				s+=1;
			}
			else if(this.cirR[i].miss(false))
				g=false;
		}
	}
}
function score(){
	push();
	fill(255,0,0,230);
	noStroke();
	textSize(40);
	text(s,520,60);
	pop();
}
function game(){
	push();
	fill(255,0,0);
	noStroke();
	textSize(75);
	text("Game Over",width/2-194,height/2);
	textSize(25);
	text("Press 'R' Key to Play Again!",width/2-155,height/2+50);
	pop();
}
function gameplay(){
	push();
	background(235);
	fill(255,0,0);
	noStroke();
	textSize(50)
	text("2 CARS",width/2-100,height/2-250);
	textSize(37);
	text("Instructions",width/2-270,height/2-150);
	textSize(25);
	text("1.You can't miss the Circles.",50,height/2-110);
	textSize(25);
	text("2.You have to dodge the Blocks.",50,height/2-80);
	textSize(37);
	text("Controls",width/2-270,height/2-30);
	textSize(25);
	text("Left Car: 'A' and 'D' Keys",50,height/2+10);
	textSize(25);
	text("Right Car: 'J' and 'L' Keys",50,height/2+40);
	textSize(40);
	text("Press Any Key To Play!!",85,height/2+150);
	pop();
}
function draw(){
	background(100,0,255);
	if(gm)
		gameplay();
	if(g && !gm){
		for(var i=0;i<d.length;i++)
			d[i].update();
		c1.update();
		c2.update();
		obs.update();	
	}
	else if(!gm){
		background(255);
		game();
	}
	if(!gm)
		score();
}
function keyPressed(){
	if(key=="A"||key=='a')
		c1.x=0.125*width;
	if(key=="D"||key=='d')
		c1.x=0.375*width;
	if(key=="J"||key=='j')
		c2.x=0.625*width;
	if(key=="L"||key=='l')
		c2.x=0.875*width;
	if(key && gm){
		gm = false;
		obs.once()
	}
	else if((key == 'R' || key == 'r') && !g)
		reset()
}

function reset(){
	g = true
	gm = true
	obs.obsL = []
	obs.obsR = []
	obs.cirR = []
	obs.cirL = []
	s = 0
}
function windowResized(){
	resizeCanvas(600,windowHeight-4)
}