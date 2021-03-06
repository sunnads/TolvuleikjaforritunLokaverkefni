// ======
// GHOSTS
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
Ghost.prototype.scale = 0.15
Ghost.prototype.isDeadNow =false;
Ghost.prototype.movespeed = 2;
Ghost.prototype.rotation = 0;
Ghost.prototype.goThisway = 1;
Ghost.prototype.lastChangeRow = 0;
Ghost.prototype.lastChangeCol = 0;
Ghost.prototype.ghostNr = 1;
Ghost.prototype.resetRow =0;
Ghost.prototype.resetCol = 0;
Ghost.prototype.resetCx = 0;
Ghost.prototype.resetCy = 0;
Ghost.prototype.resetGhostNr = 0;
Ghost.prototype.startTimer =0;
Ghost.prototype.isStart = true;
Ghost.prototype.panicMode = false;
Ghost.prototype.panicTimer = 0;


Ghost.prototype.update = function (du) {
    if(g_frameCounter >=this.startTimer){
        if(this.isStart) {
            this.cy = 7*28;
            this.cx = 13*28;
            this.row = 7;
            this.col = 13;
            this.isStart = false;
        }
        if(g_frameCounter >= this.panicTimer+400){
            this.panicMode=false;
        }
        this.hitPacman();
        this.move(du);
    }
};

Ghost.prototype.ghostSprite = function (){

    if(this.panicMode){
        return g_sprites.panicGhost;
    }else{
    switch(this.ghostNr) {
        case 1 : return g_sprites.ghost1
            break;
        case 2 : return g_sprites.ghost2
            break;
        case 3 : return g_sprites.ghost3
            break;
        case 4 : return g_sprites.ghost4
            break;
    }
    }
};

// random function not in use at the moment
Ghost.prototype.getRandom = function () {

      return Math.floor((Math.random() * 4) + 1);
};

Ghost.prototype.hitPacman = function () {
    if(entityManager._pacman[0].row === this.row && entityManager._pacman[0].col === this.col){
        if(this.panicMode){
            this.reset();
        }
        else {
            entityManager._pacman[0].hitGhost();
        }
    }
};

Ghost.prototype.goPanicMode = function () {
    this.panicMode = true;
    this.panicTimer = g_frameCounter;

}

Ghost.prototype.move = function () {

    // Ghost moves to Right
    if (this.goThisway === 1){
        this.cx += this.movespeed;
        // teleportghost
        if (this.cx >=546){
            this.cx = 15;
        }
        this.cy = this.row * 28;
        this.col = Math.round(this.cx / 28);
        //prewent to turn 180 if changing direction
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.whereToMove();
            if(2!==(tryDirection)) {
                this.lastChangeRow = this.row;
                this.lastChangeCol = this.col;
                console.log(this.whereToMove());
                this.goThisway = tryDirection;
            }
        }
    }
    // Ghost moves to Left
    else if (this.goThisway === 2){
        this.cx += -this.movespeed;
        // teleport Ghost
        if (this.cx <=15){
            this.cx = 546;
        }
        this.cy = this.row * 28;
        this.col = Math.round(this.cx / 28);
        //prewent to turn 180 if changing direction
        if (this.changeMovement() && (this.lastChangeRow !== this.row ||this.lastChangeCol !== this.col)) {
            var tryDirection = this.whereToMove();
            if(1!==(tryDirection)) {
                this.lastChangeRow = this.row;
                this.lastChangeCol = this.col;
                this.goThisway = tryDirection;
            }
        }
    }
    //Ghost moves Down
    else if (this.goThisway === 3){
        this.cx = this.col * 28;
        this.cy += this.movespeed;
        // teleports ghost
        if (this.cy >=378){
            this.cy = 15;
        }
        this.row = Math.round(this.cy / 28);
        //prewent to turn 180 if changing direction
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.whereToMove();
            if(4!==(tryDirection)) {
                this.lastChangeRow = this.row;
                this.lastChangeCol = this.col;
                this.goThisway = tryDirection;
            }
        }
    }
    // Ghost moves Up
    else if (this.goThisway === 4) {
        this.cx = this.col * 28;
        this.cy += -this.movespeed;
        //teleports ghost
        if (this.cy <=15){
            this.cy = 378;
        }
        this.row = Math.round(this.cy / 28);
        //prewent to turn 180 if changing direction
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.whereToMove();
            if(3!==(tryDirection)) {
                this.lastChangeRow = this.row;
                this.lastChangeCol = this.col;
                this.goThisway = tryDirection;
            }
        }

    }
};

/// did not work out we tried pathfinding
Ghost.prototype.moveGhost2 = function () {
    // can't find this.goThisway
    console.log("gothisway í move ", this.goThisway );
    // Ghost moves to Right
    if (this.goThisway === 1){
        this.cx += this.movespeed;
        // teleportghost
        if (this.cx >=546){
            this.cx = 15;
        }
        this.cy = this.row * 28;
        this.col = Math.round(this.cx / 28);
        console.log(this.goThisway, "gothisway gildi");
        //prewent to turn 180 if changing direction
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.findShortestWay();
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
        // teleport Ghost
        if (this.cx <=15){
            this.cx = 546;
        }
        this.cy = this.row * 28;
        this.col = Math.round(this.cx / 28);
        console.log(this.goThisway, "gothisway gildi");
        //prewent to turn 180 if changing direction
        if (this.changeMovement() && (this.lastChangeRow !== this.row ||this.lastChangeCol !== this.col)) {
            var tryDirection = this.findShortestWay();
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
        // teleports ghost
        if (this.cy >=378){
            this.cy = 15;
        }
        this.row = Math.round(this.cy / 28);
        console.log(this.goThisway, "gothisway gildi");
        //prewent to turn 180 if changing direction
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.findShortestWay();
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
        //teleports ghost
        if (this.cy <=15){
            this.cy = 378;
        }
        this.row = Math.round(this.cy / 28);
        console.log(this.goThisway, "gothisway gildi");
        //prewent to turn 180 if changing direction
        if (this.changeMovement() && (this.lastChangeRow !== this.row || this.lastChangeCol !== this.col)) {
            var tryDirection = this.findShortestWay();
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
        nextMove === 7 || nextMove === 8 || nextMove === 9 || nextMove === 10) {
        return true;
    }
    return false;
};


Ghost.prototype.whereToMove = function () {
    var NextMove = Maze.prototype.g_maze[0].mazeGrid[this.row-1][this.col-1];
    var array = findWhereCanGo(NextMove);
    var item = array[Math.floor(Math.random()*array.length)];

    return item;
};

Ghost.prototype.addToDirection = function (direction) {
    switch(direction){
        case 1 : return this.row +1;
        case 2 : return this.row -1;
        case 3 : return this.col +1;
        case 4 : return this.col -1;
    }
};

Ghost.prototype.findShortestWay = function () {
    console.log("kem ég hingað");
    var NextMove = Maze.prototype.g_maze[0].mazeGrid[this.row-1][this.col-1];
    var array = findWhereCanGo(NextMove);

    var rowPatman = entityManager._pacman[0].row;
    var colPatman = entityManager._pacman[0].col;
    var rowGhost2 = this.row;
    var colGhost2 = this.col;
    console.log(rowPatman, colPatman, rowGhost2, colGhost2);

    var checkRow = Math.abs(rowPatman - rowGhost2);
    var checkCol = Math.abs(colPatman - colGhost2);

    console.log(array);
    console.log(array.includes(1));
    console.log("colPat", colPatman);
    console.log("rowPat", rowPatman);
    console.log("checkcolghost", colGhost2 );
    console.log("checkrowghost", rowGhost2 );
    console.log("chekCol  ", checkCol);

    if (array != null && array.includes(1)){
        var directionRight = Math.abs(colPatman - (colGhost2+1));
        console.log("directionright", directionRight);
        if (directionRight < checkCol ){
            console.log("En kemst ég hingað inn 1");

            return this.goThisway = 1;
        }
    }
    else if (array != null && array.includes(2)){
        var directionLeft = Math.abs(colPatman - (colGhost2-1));
            if (directionLeft < checkCol ) {
                console.log("En kemst ég hingað inn 2 ");
                return this.goThisway =2;

            }
    }
    else if (array != null && array.includes(3)){
        var directionDown = Math.abs(rowPatman - (checkRow+1));
            if (directionDown < checkRow) {
                console.log("En kemst ég hingað inn 3");
                return this.goThisway =3;
            }
    }
    else if (array != null && array.includes(4)){
        var directionUp = Math.abs(rowPatman - (checkRow - 1));
        if (directionUp < checkRow){
            console.log("En kemst ég hingað inn 4");
            return this.goThisway =4;
            }
    }
    else  {
        console.log("random gildið ");
        return this.whereToMove();

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
    this.row = this.resetRow;
    this.col = this.resetCol;
    this.cx = this.resetCx;
    this.cy = this.resetCy;
    this.goThisway = 1;
    this.ghostNr = this.resetGhostNr;
    this.isStart = true;
};

Ghost.prototype.halt = function () {
    this.movespeed =0;
};

Ghost.prototype.render = function (ctx) {

    var sprite = this.ghostSprite();
    sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );




};
