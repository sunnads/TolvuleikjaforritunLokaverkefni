// ====
// Maze
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
 0        1         2         3         4         5         6         7         8
 12345678901234567890123456789012345678901234567890123456789012345678901234567890
 */


//lína 358
// A generic contructor which accepts an arbitrary descriptor object
function Maze(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);


}

Maze.prototype = new Entity();

 Maze.prototype.mazeTiles = [];
 Maze.prototype.cx = 0;
 Maze.prototype.cy = 0;

 Maze.prototype.g_maze = [
    {
    //drawing the maze
    /*
     a = horn upp hægri
     b = beint
     h = bein lína með línu niður
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
        ["a","b","b","b","b","h","b","b","b","b","b","b","b","y","x","j","b","b","b","l"],
        ["v","o"," "," "," ","e"," "," "," "," "," "," "," "," "," "," "," "," ","o","v"],
        ["v"," ","a","k"," "," "," ","c","b","b","b","k"," ","c","b","b","b","k"," ","v"],
        ["v"," ","v"," "," ","p"," "," "," "," "," "," "," "," "," "," "," "," "," ","v"],
        ["v"," ","v"," ","c","w","k"," ","p"," ","a","b","b","l"," ","p"," ","p"," ","v"],
        ["y"," ","v"," "," "," "," "," ","v"," ","v","x","x","f"," ","v"," ","v"," ","j"],
        ["x"," ","v"," "," "," ","p"," ","e"," ","v","x","x","t"," ","v"," ","v"," ","x"],
        ["l"," ","j","b","k"," ","e"," "," "," ","j","b","b","g"," ","e"," ","v"," ","a"],
        ["v"," "," "," "," "," "," "," ","p"," "," ","x"," "," "," "," "," ","v"," ","v"],
        ["u","b","k"," ","p"," ","p"," ","j","b","b","b","b","k"," ","p"," ","e"," ","v"],
        ["v"," "," "," ","v"," ","v"," "," "," "," "," "," "," "," ","v"," "," "," ","v"],
        ["v"," ","s"," ","e"," ","j","k"," ","c","b","b","b","k"," ","e"," ","s"," ","v"],
        ["v","o"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","o","v"],
        ["j","b","b","b","b","b","b","b","b","b","b","b","b","l","x","a","b","b","b","y"]
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

     */

    mazeGrid : [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,0,2,0,1,0,0,0,0,0,6,0,3,0,0,0,2,0],
        [0,0,0,0,4,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,7,0,8,6,0,6,0,0,3,0,6,0,6,0,4,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,4,6,6,0,5,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,5,0,8,3,5,0,0,0,0,0,0,0,0,0,0,0,0,4,0],
        [0,0,0,0,0,0,0,4,0,5,0,0,0,0,0,0,0,0,0,0],
        [0,8,0,6,0,9,0,5,0,8,0,0,0,0,9,0,5,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,0,5,0,0,0,8,6,0,0,0,0,0,5,0,4,0,5,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,8,0,3,0,3,0,0,3,0,0,0,0,0,3,0,3,0,7,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        // gera svona og ákveða hvaða tala segir til um hvert meigi fara
    ]
}
];



function findTileSprite(letter) {
    switch(letter){

        case "a" : return g_sprites.tiles7;
        case "b" : return g_sprites.tiles6;
        case "h" : return g_sprites.tiles13;
        case "c" : return g_sprites.tiles2;
        case "k" : return g_sprites.tiles4;
        case "l" : return g_sprites.tiles8;
        case "v" : return g_sprites.tiles5;
        case "p" : return g_sprites.tiles3;
        case "e" : return g_sprites.tiles1;
        case "w" : return g_sprites.tiles11;
        case "t" : return g_sprites.tiles18;
        case "f" : return g_sprites.tiles17;
        case "g" : return g_sprites.tiles16;
        case "j" : return g_sprites.tiles10;
        case "y" : return g_sprites.tiles9;
        case "u" : return g_sprites.tiles12;
        case "i" : return g_sprites.tiles14;
        case "s" : return g_sprites.tiles15;
        case "x" : return g_sprites.tiles0;
        case " " : return g_sprites.tilesdot;
        case "o" : return g_sprites.tilesredbull;
        default: return g_sprites.tiles0;
    }
}


function buildMaze(k,ctx) {
    for(var r = 0; r<k.g_maze[0].mazeCode.length; r++){ // rows
        k.cy += 28;
        k.cx = 0;
        for(var c = 0; c<k.g_maze[0].mazeCode[r].length; c++) {  // columns
            k.cx += 28;
            //var Tile = g_sprites[findTile(k.g_maze[0].mazeCode[r][c])];
            //var Tile = g_sprites.tileType.k.mazeCode[r][c]
            var sprite = findTileSprite(k.g_maze[0].mazeCode[r][c]);
            //console.log(sprite);
            //console.log(k.g_maze[0].mazeCode[r][c]);
            //console.log("cx: "+k.cx+" cy: "+k.cy+" r:"+r+" c:"+c);
            //var tile = g_sprites.sprite;
            //console.log(tile);
            sprite.drawWrappedCentredAt(ctx, k.cx, k.cy, k.rotation);
            k.mazeTiles.push(sprite);
        }
    }
    k.cy = 0;
    k.cx = 0;
}

Maze.prototype.dotsEaten =function (k) {

    var pacY = Pacman.prototype.row;
    var pacX = Pacman.prototype.col;

    if(" " === k.g_maze[0].mazeCode[pacY][pacX]){
        k.g_maze[0].mazeCode[pacY][pacX] = "x";

    }
};

Maze.prototype.update = function (du) {

    Maze.prototype.dotsEaten(this);
};

Maze.prototype.render = function (ctx) {


    buildMaze(this,ctx);
};
