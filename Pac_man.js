// ==========
// PATMAN
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
 0        1         2         3         4         5         6         7         8
 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 */


// A generic contructor which accepts an arbitrary descriptor object
function Pacman(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

}

Pacman.prototype = new Entity();

Pacman.prototype.KEY_UP = 'W'.charCodeAt(0);
Pacman.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Pacman.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Pacman.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

// Initial, inheritable, default values

Pacman.prototype.points = 0;
Pacman.prototype.animationstate = 0;
Pacman.prototype.direction = 3;
Pacman.prototype.row = 9;
Pacman.prototype.col = 12;
Pacman.prototype.cx = 12*28;
Pacman.prototype.cy = 9*28;
Pacman.prototype.scale = 0.15;
Pacman.prototype.moving = false;
Pacman.prototype._isDeadNow = false;
Pacman.prototype.movespeed = 3;
Pacman.prototype.rotation = 0;
Pacman.prototype.redBullMode = false;
Pacman.prototype.lives = 2;

Pacman.prototype.eatingSound = new Audio(
    "sounds/eating.mp3");
Pacman.prototype.dieSound = new Audio(
    "sounds/die.mp3");
Pacman.prototype.eatingRedBullSound = new Audio(
    "sounds/eatpill.mp3");
Pacman.prototype.eatingKristallSound = new Audio(
    "sounds/extra_lives.mp3");

Pacman.prototype.update = function (du) {
    if(g_frameCounter >=280) {
        this.move(du);
        if (this.moving) {
            if (g_frameCounter % 5 === 0) {
                if (this.animationstate < 3) {
                    this.animationstate += 1;
                }
                else {
                    this.animationstate = 0;
                }
            }
        }
        this.animatePacman();
        this.checkDot();
        this.checkRedBull();
        this.checkKristall();
        this.moving = false;
    }
};

Pacman.prototype.animatePacman = function () {
    switch(this.direction){
        case 1 : this.rotation = 4.5; break;
        case 2 : this.rotation = 1.5; break;
        case 3 : this.rotation = 0; break;
        case 4 : this.rotation = 3; break;
    }

};

Pacman.prototype.move = function (du) {

    if(keys[this.KEY_UP]){

        if(this.canMove(-1,0)) {
            this.direction = 1;
            this.cx = this.col*28;
            this.cy += -this.movespeed*du;
            if (this.cy <=15){
                this.cy = 378;
            }
            this.row = Math.round(this.cy/28);
            this.moving = true;
        }
    }
    else if(keys[this.KEY_DOWN]){

        if(this.canMove(1,0)) {
            this.direction = 2;
            this.cx = this.col*28;
            this.cy += this.movespeed*du;
            if (this.cy >=378){
                this.cy = 15;
            }
            this.row = Math.round(this.cy/28);
            this.moving = true;
        }
    }
    else if(keys[this.KEY_RIGHT]){

        if(this.canMove(0,1)) {
            this.direction = 3;
            this.cx += this.movespeed*du;
            if (this.cx >=546){
                this.cx = 15;
            }
            this.cy = this.row*28;
            this.col = Math.round(this.cx/28);
            this.moving = true;
        }
    }
    else if(keys[this.KEY_LEFT]){
        this.direction = 4;
        if(this.canMove(0,-1)) {
            this.direction = 4;
            this.cx += -this.movespeed*du;
            if (this.cx <=15){
                this.cx = 546;
            }
            this.cy = this.row*28;
            this.col = Math.round(this.cx/28);
            this.moving = true;
        }
    }
};

Pacman.prototype.halt = function () {
    this.movespeed = 0;

};

Pacman.prototype.gameOver = function (ctx) {
    if(this.lives<=0){
        ctx.font = "50px Comic Sans MS";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", 300, 200);
        this.halt();
        entityManager.haltGhost();
    }
};

Pacman.prototype.hitGhost = function () {
    if(!this.redBullMode){
        entityManager.resetPacman();
        this.lives--;
        this.dieSound.play();
        entityManager.resetGhosts();
    }
    else if(this.redBullMode){
        this.points+=200;
    }
};

Pacman.prototype.checkDot = function () {

    if(" " === Maze.prototype.g_maze[0].mazeCode[this.row-1][this.col-1]){
        Maze.prototype.g_maze[0].mazeCode[this.row-1][this.col-1] = "x";
        this.points += 10;
        Maze.prototype.g_maze[0].mazeDots--;
        this.eatingSound.play();
    }
};

Pacman.prototype.checkRedBull = function () {

    if("o" === Maze.prototype.g_maze[0].mazeCode[this.row-1][this.col-1]){
        Maze.prototype.g_maze[0].mazeCode[this.row-1][this.col-1] = "x";
        this.points += 50;
        Maze.prototype.g_maze[0].mazeDots--;
        this.eatingRedBullSound.play();
        entityManager.panicGhosts();
    }
};

Pacman.prototype.checkKristall = function () {

    if("kr" === Maze.prototype.g_maze[0].mazeCode[this.row-1][this.col-1]){
        Maze.prototype.g_maze[0].mazeCode[this.row-1][this.col-1] = "x";
        this.points += 100;
        this.lives++;
        this.eatingKristallSound.play();
    }
};

Pacman.prototype.canMove =function(y,x) {
    var nextTile;
    if((this.row+y-1)<1){
        nextTile = Maze.prototype.g_maze[0].mazeCode[Maze.prototype.g_maze[0].mazeCode.length - 1][this.col + x - 1];
    }
    else if((this.row+y-1)>Maze.prototype.g_maze[0].mazeCode.length-1){
        nextTile = Maze.prototype.g_maze[0].mazeCode[0][this.col + x - 1];
    }
    else if((this.col+x-1)<1){
        nextTile = Maze.prototype.g_maze[0].mazeCode[this.row + y - 1][Maze.prototype.g_maze[0].mazeCode[0].length - 1];
    }
    else if((this.col+x-1)>Maze.prototype.g_maze[0].mazeCode[0].length-1){
        nextTile = Maze.prototype.g_maze[0].mazeCode[this.row + y - 1][0];
    }
    else {
        nextTile = Maze.prototype.g_maze[0].mazeCode[this.row + y - 1][this.col + x - 1];
    }
    if (nextTile === " " || nextTile === "x" || nextTile === "o" || nextTile === "kr") {
        return true;
        console.log("canMove");
    }
    return false;
};


Pacman.prototype.mouthMove = function () {

    if(this.animationstate===0){
        return g_sprites.patman1;
    }
    else if(this.animationstate===1){
        return g_sprites.patman2;
    }
    else if(this.animationstate===2){
        return g_sprites.patman3;
    }
    else if(this.animationstate===3){
        return g_sprites.patman2;
    }

}


Pacman.prototype.reset = function () {
    this.row = 9;
    this.col = 12;
    this.cx = 12*28;
    this.cy = 9*28;
    this.scale = 0.15;
    this.moving = false;
    //this.halt();

};


Pacman.prototype.render = function (ctx) {
    ctx.font = "23px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("Lives : "+this.lives, 250, 445);
    ctx.fillText("Points : "+this.points, 250, 475);
    ctx.font = "13px Comic Sans MS";
    ctx.fillText("How to play :", 20, 510);
    ctx.fillText("Use A,S,D,W keys to move Pat man.", 20, 530);
    ctx.fillText("Eat all the dots to get points, but watch out for the evil Ghost student ", 20, 550);
    ctx.fillText("or they will eat you to get better grades. Drink a redbull to attack students", 20, 570);
    ctx.fillText("and eat them. Snack on some delicious Kristall to get extra points.", 20, 590);
    this.gameOver(ctx);
    var sprite = this.mouthMove();
    sprite.scale = this.scale;
    sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation);
};
