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
    this.sprite = this.sprite || g_sprites.pacman;

}

Pacman.prototype = new Entity();

Pacman.prototype.KEY_UP = 'W'.charCodeAt(0);
Pacman.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Pacman.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Pacman.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

// Initial, inheritable, default values

Pacman.prototype.cx = 12*28;
Pacman.prototype.cy = 9*28;
Pacman.prototype.moveX =0;
Pacman.prototype.moveY =0;

//get the row index of current location
Pacman.prototype.getRow = function() {
    return getRowIndex(this.cy);
};

//get the col index of current location
Pacman.prototype.getCol = function() {
    return getColIndex(this.cx);
};

Pacman.prototype.update = function () {
    this.move();
    this.cx += this.moveX;
    this.cy += this.moveY;
};

var Pacman_movespeed = 28;

Pacman.prototype.move = function () {
    if(keys[this.KEY_UP]){
        this.moveY = -1;
    }
    if(keys[this.KEY_DOWN]){
        this.moveY = 1;
    }
    if(keys[this.KEY_RIGHT]){
        this.moveX = 1;
    }
    if(keys[this.KEY_LEFT]){
        this.moveX = -1;
    }
};

Pacman.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};


Pacman.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;

};




Pacman.prototype.render = function (ctx) {
    this.sprite.scale = 0.15;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
