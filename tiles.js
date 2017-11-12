// ====
// Tiles
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Tiles(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);


    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g.sprite.tiles1;
    this.scale  = this.scale  || 1;

/*
    // Diagnostics to check inheritance stuff
    this._rockProperty = true;
    console.dir(this);
*/

}


Tiles.prototype = new Entity();

Tiles.prototype.cx = 0;
Tiles.prototype.cy =0;

Tiles.prototype.tileType =[{
    a : "tiles7",
    b : "tiles6",
    h : "tiles13",
    c : "tiles2",
    k : "tiles4",
    l : "tiles8",
    v : "tiles5",
    p : "tiles3",
    e : "tiles1",
    w : "tiles11",
    t : "tiles18",
    f : "tiles17",
    g : "tiles16",
    j : "tiles10",
    y : "tiles9",
    u : "tiles12",
    i : "tiles14",
    s : "tiles15",
    x : "tiles0"
}];

function whatTile(letter) {

    return g.sprite.tileType[letter];
}

function setTile(letter) {
    this.sprite = this.sprite || whatTile(letter);

}


Tiles.prototype.update = function (du) {

};


Tiles.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
