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
    return Math.floor((Math.random() * 4) + 1);
}


Ghost.prototype.move = function () {

    var random =  this.getRandom();

    if (random === 1){
        if (this.canMove(0,1)) {
            this.direction = 3;
            this.cx += this.movespeed;
            this.cy = this.row*28;
            this.col = Math.round(this.cx/28);
            console.log (random);
            console.log("fyrsta random");
        }
        else {
            console.log (random);
            this.getRandom();

            console.log("nyt gildi 1");
            console.log (random);
        }
    }

    else if (random === 2){
        if (this.canMove(0,-1)) {
            this.direction = 4;
            this.cx += -this.movespeed;
            this.cy = this.row*28;
            this.col = Math.round(this.cx/28);
            console.log (random);
            console.log("seina random");
        }
        else {
            console.log (random);
            this.getRandom();
            console.log("seina nyt gildi 2", random);
        }
    }
    else if (random === 3){
        if (this.canMove(1,0)){
            this.direction = 2;
            this.cx = this.col*28;
            this.cy += this.movespeed;
            this.row = Math.round(this.cy/28);
        }
        else {
            console.log("nyt gildi 3");
            this.getRandom();

        }
    }

    else if (random === 4){
        this.direction = 1;
        if(this.canMove(-1,0)) {
            this.direction = 1;
            this.cx = this.col*28;
            this.cy += -this.movespeed;
            this.row = Math.round(this.cy/28);
        }
        else {
            this.getRandom();
        }
    }
};


Ghost.prototype.canMove =function(y,x) {

    var nextTile = Maze.prototype.g_maze[0].mazeCode[this.row+y-1][this.col+x-1];
    if(nextTile === " " || nextTile === "x" || nextTile === "o") {
        return true;
    }
    return false;
}

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
