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
Ghost.prototype.row = 4;
Ghost.prototype.col = 12;
Ghost.prototype.cx = 12*28;
Ghost.prototype.cy = 4*28;
Ghost.prototype.scale = 0.15;
//Chost.prototype.moving = false;
//Chost.prototype.isDeadNow =false;
Ghost.prototype.movespeed = 2;
Ghost.prototype.rotation = 0;
Ghost.prototype.goThisway = 2;
Ghost.prototype.lastChangeRow = 0;
Ghost.prototype.lastChangeCol = 0;


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

    // Ghost moves to Right
    if (this.goThisway === 1){
        this.cx += this.movespeed;
        this.cy = this.row * 28;
        this.col = Math.round(this.cx / 28);
        console.log(this.goThisway, "gothisway gildi");
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.whereToMove();
            if(2!==(tryDirection)) {
                this.lastChangeRow = this.row;
                this.lastChangeCol = this.col;
                console.log("whereTomove test testidi í test");
                console.log(this.whereToMove());
                this.goThisway = tryDirection;
            }
        }
    }
    // Ghost moves to Left
    else if (this.goThisway === 2){
        this.cx += -this.movespeed;
        this.cy = this.row * 28;
        this.col = Math.round(this.cx / 28);
        console.log(this.goThisway, "gothisway gildi");
        if (this.changeMovement() && (this.lastChangeRow !== this.row ||this.lastChangeCol !== this.col)) {
            var tryDirection = this.whereToMove();
            if(1!==(tryDirection)) {
                this.lastChangeRow = this.row;
                this.lastChangeCol = this.col;
                this.goThisway = tryDirection;
                console.log("If inn í ifinu  nr 22");
            }
        }
    }
    //Ghost moves Down
    else if (this.goThisway === 3){
        this.cx = this.col * 28;
        this.cy += this.movespeed;
        this.row = Math.round(this.cy / 28);
        console.log(this.goThisway, "gothisway gildi");
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.whereToMove();
            if(4!==(tryDirection)) {
                this.lastChangeRow = this.row;
                this.lastChangeCol = this.col;
                this.goThisway = tryDirection;
                console.log("If inn í ifinu  33");
            }
        }
    }
    // Ghost moves Up
    else if (this.goThisway === 4) {
        this.cx = this.col * 28;
        this.cy += -this.movespeed;
        this.row = Math.round(this.cy / 28);
        console.log(this.goThisway, "gothisway gildi");
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.whereToMove();
            if(3!==(tryDirection)) {
                this.lastChangeRow = this.row;
                this.lastChangeCol = this.col;
                this.goThisway = tryDirection;
                console.log("If inn í ifinu  44");
            }
        }

    }
};

Ghost.prototype.changeMovement = function() {

    var nextMove = Maze.prototype.g_maze[0].mazeGrid[this.row-1][this.col-1];
    if(nextMove === 1 || nextMove === 2 || nextMove === 3||
        nextMove === 4 || nextMove === 5 || nextMove === 6 ||
        nextMove === 7 || nextMove === 8 || nextMove === 9) {
        return true;
    }
    return false;
};


Ghost.prototype.whereToMove = function () {
    var thisNextMove = Maze.prototype.g_maze[0].mazeGrid[this.row-1][this.col-1];
    var array = findWhereCanGo(thisNextMove);
    var item = array[Math.floor(Math.random()*array.length)];

    return item;
};


Ghost.prototype.findDirecPreventTurnaround = function (){
    console.log("switch case ", this.goThisway);
    switch(this.goThisway){

        case 1 : return 2;
        case 2 : return 1;
        case 3 : return 4;
        case 4 : return 3;
    }
};


Ghost.prototype.canMove = function(y,x) {

    var nextTile = Maze.prototype.g_maze[0].mazeCode[this.row+y-1][this.col+x-1];
    if(nextTile === " " || nextTile === "x" || nextTile === "o") {
        return true;
    }
    return false;
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
