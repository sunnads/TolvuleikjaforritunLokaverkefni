// ====
// Wall
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
 0        1         2         3         4         5         6         7         8
 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 */
var veggur;
var wallX = 0;
var wallY = 0;

//lína 358

var g_wall = [
    {
    wall     : 3, //veit ekki allveg afhverju 3
    //drawing the walls
    /*
     a = efsta horn
     b = beint
     h = bein lína með línu miður
     c = endi vinstri
     k = endi hægri
     x = opið//draugahús//pacman byrjar
     l = horn upp hægri
     v = beint niður
     o = stór kúla
     p = endi upp
     e = endi niður
     w = bein lína og strik upp
     t = hurð fyrir drauga
     f = efraop á drauga hruð
     g = horn/op á draugahruð
     j = horn niðri vinstri
     y = horn niðri hægri
     u = lína niður og til hægri
     i = lína niður og til vinstri
     s = kross
     */
    wallCode : [
        "abbbbhbbbbbbbcxkbbbl"
        "vo   e            ov"
        "v ac   kbbbk kbbbc v"
        "v v  p             v"
        "v v kwc p abbl p p v"
        "e v     v vxxf v v e"
        "x v   p e vxxt v v x"
        "p jbc e   jhhg e v p"
        "v       p  x     v v"
        "ubc p p jbbbbc p e v"
        "v   v v        v   v"
        "v s e jc kbbbc e s v"
        "v                  v"
        "jbbbbbbbbbbbbcxkbbby"
    ],
    //where patman can move
    /*
     1 = niður og hægri
     2 = niður og vinstri
     3 = upp, hægri, vinstri
     4 = upp, niður, hægri
     5 = upp, niður, vinstri
     6 = hægri, vinstri, niður
     7 = upp, vinstri
     8 = hægri, upp
     9 =
     */

    wallGrid : [
        // segir hvert hann meigi fara (breyta um stefnu)
        "00000000000000000000"
        "01002010000060300020"
        "00004050000000000000"
        "00017086060030606040"
        "00000000000000000000"
        "00046605000000000000"
        "05083500000000000040"
        "00000004050000000000"
        "08060905080000905000"
        "00000000000000000000"
        "01050008600000504050"
        "00000000000000000000"
        "08030300300000303070"
        "00000000000000000000"
    ]
}
];

// ef við viljum fleiri borð þá gera aftur allt þetta 3 hér fyrir ofan

var wallPice = new Array (
    'a', 'tiles7', 'b', 'tiles6', 'h', 'tiles13', 'c', 'tiles2', 'k', 'tiles4',
    'l', 'tiles8', 'v', 'tiles5', 'p', 'tiles3', 'e', 'tiles1', 'w', 'tiles11',
    't', 'tiles18', 'f', 'tiles17', 'g', 'tiles16', 'j', 'tiles10', 'y', 'tiles9'
    'u', 'tiles12', 'i', 's', 'tiles14', 'tiles15', 'x', 'tiles0'
);
 
function buildWalls(a) {
    var m = walls[a];
    food = 0;
    veggur =
}


// gamla draslið
// ====
// ROCK
// ====


// A generic contructor which accepts an arbitrary descriptor object
function Rock(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomisePosition();
    this.randomiseVelocity();

    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.rock;
    this.scale  = this.scale  || 1;

/*
    // Diagnostics to check inheritance stuff
    this._rockProperty = true;
    console.dir(this);
*/

};

Rock.prototype = new Entity();

Rock.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
    this.rotation = this.rotation || 0;
};

Rock.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = this.velX || speed * Math.cos(dirn);
    this.velY = this.velY || speed * Math.sin(dirn);

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

    this.velRot = this.velRot ||
        util.randRange(MIN_ROT_SPEED, MAX_ROT_SPEED) / SECS_TO_NOMINALS;
};

Rock.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    if (this._isDeadNow)
    return entityManager.KILL_ME_NOW;


    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 1 * this.velRot;
    this.rotation = util.wrapRange(this.rotation,
                                   0, consts.FULL_CIRCLE);

    this.wrapPosition();

    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Rock.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

// HACKED-IN AUDIO (no preloading)
Rock.prototype.splitSound = new Audio(
  "sounds/rockSplit.ogg");
Rock.prototype.evaporateSound = new Audio(
  "sounds/rockEvaporate.ogg");

Rock.prototype.takeBulletHit = function () {
    this.kill();

    if (this.scale > 0.25) {
        this._spawnFragment();
        this._spawnFragment();

        this.splitSound.play();
    } else {
        this.evaporateSound.play();
    }
};

Rock.prototype._spawnFragment = function () {
    entityManager.generateRock({
        cx : this.cx,
        cy : this.cy,
        scale : this.scale /2
    });
};

Rock.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
