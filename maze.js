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
        ["a","b","b","b","b","h","b","b","b","b","b","b","b","c","x","k","b","b","b","l"],
        ["v","o"," "," "," ","e"," "," "," "," "," "," "," "," "," "," "," "," ","o","v"],
        ["v"," ","a","c"," "," "," ","k","b","b","b","k"," ","k","b","b","b","c"," ","v"],
        ["v"," ","v"," "," ","p"," "," "," "," "," "," "," "," "," "," "," "," "," ","v"],
        ["v"," ","v"," ","k","w","c"," ","p"," ","a","b","b","l"," ","p"," ","p"," ","v"],
        ["e"," ","v"," "," "," "," "," ","v"," ","v","x","x","f"," ","v"," ","v"," ","e"],
        ["x"," ","v"," "," "," ","p"," ","e"," ","v","x","x","t"," ","v"," ","v"," ","x"],
        ["p"," ","j","b","c"," ","e"," "," "," ","j","h","h","g"," ","e"," ","v"," ","p"],
        ["v"," "," "," "," "," "," "," ","p"," "," ","x"," "," "," "," "," ","v"," ","v"],
        ["u","b","c"," ","p"," ","p"," ","j","b","b","b","b","c"," ","p"," ","e"," ","v"],
        ["v"," "," "," ","v"," ","v"," "," "," "," "," "," "," "," ","v"," "," "," ","v"],
        ["v"," ","s"," ","e"," ","j","c"," ","k","b","b","b","c"," ","e"," ","s"," ","v"],
        ["v","o"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","o","v"],
        ["j","b","b","b","b","b","b","b","b","b","b","b","b","c","x","k","b","b","b","y"]
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
// ef við viljum fleiri borð þá gera aftur allt þetta 3 hér fyrir ofan
Maze.prototype.tileType =[{
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
    x : "tiles1",
    "" : "tiles1"
}];

function findTile(letter) {
    switch(letter){

        case a : return "tiles7";
        case b : return "tiles6";
        case h : return "tiles13";
        case c : return "tiles2";
        case k : return "tiles4";
        case l : return "tiles8";
        case v : return "tiles5";
        case p : return "tiles3";
        case e : return "tiles1";
        case w : return "tiles11";
        case t : return "tiles18";
        case f : return "tiles17";
        case g : return "tiles16";
        case j : return "tiles10";
        case y : return "tiles9";
        case u : return "tiles12";
        case i : return "tiles14";
        case s : return "tiles15";
        case x : return "tiles1";
        case "": return "tiles1";
    }
}


function buildMaze(k,ctx) {
    for(var r = 0; r<k.mazeCode.length;r++){
        this.cx +=5;
        this.cy =0;
        for(var c = 0; c<k.mazeCode[r].length;c++){
            this.cy+=5;
            var Tile = g_sprites[findTile(k.mazeCode[r][c])];
            //var Tile = g_sprites.tileType.k.mazeCode[r][c]
            Tile.drawWrappedCentredAt(
                ctx, this.cx, this.cy, this.rotation);
            this.mazeTiles.push(Tile);
        }
    }
}

Maze.prototype.update = function (du) {

};

Maze.prototype.render = function (ctx) {


    buildMaze(this.g_maze,ctx);
};
