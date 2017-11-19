// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Ghost(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.sprite = this.sprite || g_sprites.ghost1;
    // Make a noise when I am created (i.e. fired)
    this.fireSound.play();

/*
    // Diagnostics to check inheritance stuff
    this._bulletProperty = true;
    console.dir(this);
*/

}

Ghost.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Ghost.prototype.fireSound = new Audio(
    "sounds/bulletFire.ogg");

// Initial, inheritable, default values
Ghost.prototype.animate= [];
Ghost.prototype.animationstate = 0;
Ghost.prototype.direction = 1;
Ghost.prototype.row = 4;
Ghost.prototype.col = 12;
Ghost.prototype.cx = 12*28;
Ghost.prototype.cy = 4*28;
Ghost.prototype.scale = 0.15;
//Chost.prototype.moving = false;
//Chost.prototype.isDeadNow =false;
Ghost.prototype.movespeed = 2;
Ghost.prototype.rotation = 0;
Ghost.prototype.random = 1;


Ghost.prototype.update = function (du) {
    this.move();

};

Ghost.prototype.animateGhost = function () {

}

/*
Chost.prototype.taketHit = function () {
    this.kill();

    // Make a noise when I am zapped by another bullet
    //this.zappedSound.play();
};*/

Ghost.prototype.getRandom = function () {

       console.log(this.changeMovement());
      return Math.floor((Math.random() * 4) + 1);



}


Ghost.prototype.move = function () {


   // var random =  this.getRandom();
    // Ghost moves to Rightp
    if (this.random === 1){
        if (this.canMove(0,1)) {
            this.direction = 3;
            this.cx += this.movespeed;
            this.cy = this.row*28;
            this.col = Math.round(this.cx/28);
            console.log (this.random);
            console.log("fyrsta random");
        }
        else {
            console.log("komin í enda");
            this.random = this.getRandom();
        }
        // skoða að setja skylriði um mazeCode 

    }
    // Ghost moves to Left
    else if (this.random === 2){
        if (this.canMove(0,-1)) {
            this.direction = 4;
            this.cx += -this.movespeed;
            this.cy = this.row*28;
            this.col = Math.round(this.cx/28);
            console.log (this.random);
            console.log("seina random");
        }
        else {
            this.random = this.getRandom();
        }
    }

    //Ghost moves Down
    else if (this.random === 3){
        if (this.canMove(1,0)){
            this.direction = 2;
            this.cx = this.col*28;
            this.cy += this.movespeed;
            this.row = Math.round(this.cy/28);
        }
        else {
            this.random = this.getRandom();
        }
    }
    // Ghost moves Up
    else if (this.random === 4) {
        this.direction = 1;
        if (this.canMove(-1, 0)) {
            this.direction = 1;
            this.cx = this.col * 28;
            this.cy += -this.movespeed;
            this.row = Math.round(this.cy / 28);
        }
        else {
            this.random = this.getRandom();
        }
    }

  /*  if (random === 0) {
        if (this.canMove(0, 1)) {
            this.direction = 3;
            this.cx += this.movespeed;
            this.cy = this.row * 28;
            this.col = Math.round(this.cx / 28);
            console.log(random);
            console.log("fyrsta random");
        }
    }*/

};

Ghost.prototype.changeMovement =function(y,x) {

    var nextMove = Maze.prototype.g_maze[0].mazeGrid[this.row+y-1][this.col+x-1];
    if(nextMove === 1 || nextMove === 2 || nextMove === 3|| nextMove === 4 || nextMove === 5 || nextMove === 6) {
        console.log("changeMovement");
        return true;
    }
    console.log("changeMovement not ");
    return false;
};

Ghost.prototype.canMove =function(y,x) {

    var nextTile = Maze.prototype.g_maze[0].mazeCode[this.row+y-1][this.col+x-1];
    if(nextTile === " " || nextTile === "x" || nextTile === "o") {
        return true;
    }
    return false;
};

Ghost.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Ghost.prototype.reset = function () {
    this.direction = 0;
    this.row = 4;
    this.col = 12;
    this.cx = 4*28;
    this.cy = 12*28;
    this.scale = 0.15;
    this.moving = false;
    this._isDeadNow =false;

};

Ghost.prototype.render = function (ctx) {

    this.animateGhost();
    g_sprites.ghost1.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );


};
