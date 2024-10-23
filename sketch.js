let imagenPelota;
let imagenRaqueta;
let imagenComputadora;
let imagenFondo;
let sonidoRaqueta;
let sonidoGol;
let puntosJugador=0;
let puntosComputadora=0;

class Pelota{
    constructor(x,y,diametro,vx,vy){
        this.x=x;
        this.y=y;
        this.diametro=diametro;
        this.vx=vx;
        this.vy=vy;
        this.reset();
    }
    update(){
        this.x +=this.vx;
        this.y +=this.vy;
        this.rotation += this.vx + this.vy;
        if (this.x > width - this.diametro/2 || this.x < this.diametro/2){
            sonidoGol.play();
            if (this.x < width/2){
                puntosComputadora++;
            }else{
                puntosJugador++;
            }
            narrarPuntos();
            this.reset();
        }
        if (this.y > height - this.diametro/2 || this.y < this.diametro/2){
            this.vy *= -1;
        }
        if (colision(this.x, this.y, this.diametro, raqueta.x, raqueta.y, raqueta.width, raqueta.height) || colision(this.x, this.y, this.diametro, computadora.x, computadora.y, computadora.width, computadora.height)) {
            sonidoRaqueta.play();
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
        }
    }
    reset(){
        this.x = 400;
        this.y = 200;
        this.vx=5*(Math.random() <0.5 ? -1:1);
        this.vy=5*(Math.random() <0.5 ? -1:1);
        this.rotation=0;
    }
    draw(){
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        image(imagenPelota, -this.diametro/2, -this.diametro/2, this.diametro, this.diametro);
        pop();
    }
}

class Raqueta{
    constructor(x,y,width,height,speed){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=speed;
    }
    update(){
        if (this.x<width/2){
            this.y = mouseY;
        } else{
            if (pelota.y>this.y){
                this.y += this.speed;
            }else{
                this.y -= this.speed;
            }
        }
        this.y = constrain(this.y, 0, height - this.height);
    }
    draw(){
        if (this.x < width/2){
            image(imagenRaqueta, this.x, this.y, this.width, this.height);
        } else {
            image(imagenComputadora, this.x, this.y, this.width, this.height);
        }
        //rect(this.x, this.y, this.width, this.height);
    }
}

let pelota;
let raqueta;
let computadora;

function colision(cx,cy,diametro,rx,ry,rw,rh){
    if(cx+diametro/2<rx){
        return false;
    }
    if (cy+diametro/2<ry){
        return false;
    }
    if (cx-diametro/2>rx+rw){
        return false;
    }
    if (cy-diametro/2>ry+rh){
        return false;
    }
    return true;
}

function preload(){
    imagenPelota=loadImage('pelota.png');
    imagenRaqueta=loadImage('raqueta1.png');
    imagenComputadora=loadImage('raqueta2.png');
    imagenFondo=loadImage('fondo1.png');
    sonidoRaqueta=loadSound('446100__justinvoke__bounce.wav');
    sonidoGol=loadSound('274178__littlerobotsoundfactory__jingle_win_synth_02.wav');
}

function setup(){
    createCanvas(800, 400);
    pelota=new Pelota(400, 200, 50, 5, 5);
    raqueta=new Raqueta(30, 150,20, 100,5);
    computadora=new Raqueta(750,150,20,100,5);
}

function narrarPuntos(){
    let puntos = 0;
    if (puntosJugador == puntosComputadora){
        puntos = "Van empatados a" + puntosJugador;
    } else{
        if (puntosJugador> puntosComputadora){
            puntos ="Vas ganando" + puntosJugador + "a" + puntosComputadora;
        }else{
            puntos ="Vas perdiendo" + puntosJugador + "a" + puntosComputadora;
        }
    }
    let mensaje = new SpeechSynthesisUtterance(puntos);
    mensaje.lang= 'es-MX';
    speechSynthesis.speak(mensaje);
}

function draw(){
    //background(0);
    image(imagenFondo, 0, 0, width, height);
    pelota.update();
    pelota.draw();
    raqueta.update();
    raqueta.draw();
    computadora.update();
    computadora.draw();
}
