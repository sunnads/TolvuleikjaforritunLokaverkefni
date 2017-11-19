// ==========
// SHIP STUFF
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
    this.sprite = this.sprite || g_sprites.patman1;

}

Pacman.prototype = new Entity();

Pacman.prototype.KEY_UP = 'W'.charCodeAt(0);
Pacman.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Pacman.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Pacman.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

// Initial, inheritable, default values

Pacman.prototype.animate= [];
Pacman.prototype.animationstate = 0;
Pacman.prototype.direction = 3;
Pacman.prototype.row = 9;
Pacman.prototype.col = 12;
Pacman.prototype.cx = 12*28;
Pacman.prototype.cy = 9*28;
Pacman.prototype.scale = 0.15;
Pacman.prototype.moving = false;
Pacman.prototype._isDeadNow =false;
Pacman.prototype.movespeed = 2;
Pacman.prototype.rotation = 0;



Pacman.prototype.update = function () {
    this.move();
};

Pacman.prototype.animatePacman = function () {
    switch(this.direction){
        case 1 : this.rotation = 4.5; break;
        case 2 : this.rotation = 1.5; break;
        case 3 : this.rotation = 0; break;
        case 4 : this.rotation = 3; break;
    }
    //this.animate = [g_sprites.patman1 ,g_sprites.patman2, g_sprites.patman3, g_sprites.patman2];
    //this.sprite = this.animate[this.animationstate];
}

Pacman.prototype.move = function () {

    if(keys[this.KEY_UP]){

        if(this.canMove(-1,0)) {
            this.direction = 1;
            this.cx = this.col*28;
            this.cy += -this.movespeed;
            this.row = Math.round(this.cy/28);
        }
    }
    else if(keys[this.KEY_DOWN]){

        if(this.canMove(1,0)) {
            this.direction = 2;
            this.cx = this.col*28;
            this.cy += this.movespeed;
            this.row = Math.round(this.cy/28);
        }
    }
    else if(keys[this.KEY_RIGHT]){

        if(this.canMove(0,1)) {
            this.direction = 3;
            this.cx += this.movespeed;
            this.cy = this.row*28;
            this.col = Math.round(this.cx/28);
        }
    }
    else if(keys[this.KEY_LEFT]){
        this.direction = 4;
        if(this.canMove(0,-1)) {
            this.direction = 4;
            this.cx += -this.movespeed;
            this.cy = this.row*28;
            this.col = Math.round(this.cx/28);
        }
    }
};


Pacman.prototype.canMove =function(y,x) {

    var nextTile = Maze.prototype.g_maze[0].mazeCode[this.row+y-1][this.col+x-1];
    if(nextTile === " " || nextTile === "x" || nextTile === "o") {
        return true;
    }
    return false;
}

Pacman.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};


Pacman.prototype.reset = function () {
    this.direction = 0;
    this.row = 12;
    this.col = 9;
    this.cx = 12*28;
    this.cy = 9*28;
    this.scale = 0.15;
    this.moving = false;
    this._isDeadNow =false;

};


Pacman.prototype.render = function (ctx) {
    ctx.font = "20px Comic Sans MS ";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(this.row, 105, 450);
    ctx.fillText(this.col, 105, 475);
    this.sprite.scale = this.scale;
    this.animatePacman();
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation);
    ctx.fillText("Score: ", 60, 450);
    ctx.fillText("Lives:", 470, 450);


};
