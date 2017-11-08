// ====
// Maze
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
 0        1         2         3         4         5         6         7         8
 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 */
var mazeX = 0;
var mazeY = 0;

//lína 358
// A generic contructor which accepts an arbitrary descriptor object
function Maze(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);


    // Default sprite and scale, if not otherwise specifies
    this.scale  = this.scale  || 1;

    /*
     // Diagnostics to check inheritance stuff
     console.dir(this);
     */

};

Maze.prototype = new Entity();

var g_maze = [
    {
    maze     : 3, //veit ekki allveg afhverju 3
    //drawing the maze
    /*
     a = horn upp hægri
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
    mazeCode : [
        "abbbbhbbbbbbbcxkbbbl",
        "vo   e            ov",
        "v ac   kbbbk kbbbc v",
        "v v  p             v",
        "v v kwc p abbl p p v",
        "e v     v vxxf v v e",
        "x v   p e vxxt v v x",
        "p jbc e   jhhg e v p",
        "v       p  x     v v",
        "ubc p p jbbbbc p e v",
        "v   v v        v   v",
        "v s e jc kbbbc e s v",
        "v                  v",
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

    mazeGrid : [
        "00000000000000000000",
        "01002010000060300020",
        "00004050000000000000",
        "00017086060030606040",
        "00000000000000000000",
        "00046605000000000000",
        "05083500000000000040",
        "00000004050000000000",
        "08060905080000905000",
        "00000000000000000000",
        "01050008600000504050",
        "00000000000000000000",
        "08030300300000303070",
        "00000000000000000000"
        // gera svona og ákveða hvaða tala segir til um hvert meigi fara
    ]
}
];
// ef við viljum fleiri borð þá gera aftur allt þetta 3 hér fyrir ofan

var mazeTiles = new Array (
    'a', 'tiles7', 'b', 'tiles6', 'h', 'tiles13', 'c', 'tiles2', 'k', 'tiles4',
    'l', 'tiles8', 'v', 'tiles5', 'p', 'tiles3', 'e', 'tiles1', 'w', 'tiles11',
    't', 'tiles18', 'f', 'tiles17', 'g', 'tiles16', 'j', 'tiles10', 'y', 'tiles9'
    'u', 'tiles12', 'i', 's', 'tiles14', 'tiles15', 'x', 'tiles0'
);

function buildMaze(a) {
    var m = Maze[a];
    food = 0;
}

Maze.prototype.update = function (du) {

};

Maze.prototype.render = function (ctx) {
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
