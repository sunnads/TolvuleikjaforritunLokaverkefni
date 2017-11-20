// =========
// PATMAN
// =========
/*


"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL GAME
// ====================

function createInitialMaze() {

    entityManager.generateMaze({
    });
    entityManager.generatePacman({
    });
   entityManager.generateGhost({
        row: 4,
        col: 13,
        cx : 13*28,
        cy : 4*28,
        ghostNr : 1
    });
    entityManager.generateGhost({
        row: 4,
        col: 14,
        cx : 14*28,
        cy : 4*28,
        ghostNr : 2
    });
    entityManager.generateGhost({
        row: 4,
        col: 15,
        cx : 15*28,
        cy : 4*28,
        ghostNr : 3
    });


}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {

}


// =================
// UPDATE SIMULATION
// =================
// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();

    entityManager.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

 /*   function ResetGame() {
        entityManager.resetPacman();

    }
*/

    function processDiagnostics() {



    }


// =================
// RENDER SIMULATION
// =================
// GAME-SPECIFIC RENDERING

    function renderSimulation(ctx) {

        entityManager.render(ctx);

    }


// =============
// PRELOAD STUFF
// =============

    var g_images = {};

    function requestPreloads() {

        var requiredImages = {

            patman1: "images/patman1.png",
            patman2: "images/patman2.png",
            patman3: "images/patman3.png",

            ghost1: "images/ghost1.png",
            ghost2: "images/ghost2.png",
            ghost3: "images/ghost3.png",
            ghost4: "images/ghost4.png",

            tiles0: "images/tiles0.jpg",
            tiles1: "images/tiles1.jpg",
            tiles2: "images/tiles2.jpg",
            tiles3: "images/tiles3.jpg",
            tiles4: "images/tiles4.jpg",
            tiles5: "images/tiles5.jpg",
            tiles6: "images/tiles6.jpg",
            tiles7: "images/tiles7.jpg",
            tiles8: "images/tiles8.jpg",
            tiles9: "images/tiles9.jpg",
            tiles10: "images/tiles10.jpg",
            tiles11: "images/tiles11.jpg",
            tiles12: "images/tiles12.jpg",
            tiles13: "images/tiles13.jpg",
            tiles14: "images/tiles14.jpg",
            tiles15: "images/tiles15.jpg",
            tiles16: "images/tiles16.jpg",
            tiles17: "images/tiles17.jpg",
            tiles18: "images/tiles18.jpg",
            tileskristall: "images/tileskristall.jpg",
            tilesredbull: "images/tilesredbull.jpg",
            tilesdot: "images/tilesdot.png"
        };

        imagesPreload(requiredImages, g_images, preloadDone);
    }

    var g_sprites = {};

    function preloadDone() {

        g_sprites.patman1 = new Sprite(g_images.patman1);
        g_sprites.patman2 = new Sprite(g_images.patman2);
        g_sprites.patman3 = new Sprite(g_images.patman3);

        g_sprites.ghost1 = new Sprite(g_images.ghost1);
        g_sprites.ghost2 = new Sprite(g_images.ghost2);
        g_sprites.ghost3 = new Sprite(g_images.ghost3);
        g_sprites.ghost4 = new Sprite(g_images.ghost4);

        g_sprites.tiles0 = new Sprite(g_images.tiles0);
        g_sprites.tiles1 = new Sprite(g_images.tiles1);
        g_sprites.tiles2 = new Sprite(g_images.tiles2);
        g_sprites.tiles3 = new Sprite(g_images.tiles3);
        g_sprites.tiles4 = new Sprite(g_images.tiles4);
        g_sprites.tiles5 = new Sprite(g_images.tiles5);
        g_sprites.tiles6 = new Sprite(g_images.tiles6);
        g_sprites.tiles7 = new Sprite(g_images.tiles7);
        g_sprites.tiles8 = new Sprite(g_images.tiles8);
        g_sprites.tiles9 = new Sprite(g_images.tiles9);
        g_sprites.tiles10 = new Sprite(g_images.tiles10);
        g_sprites.tiles11 = new Sprite(g_images.tiles11);
        g_sprites.tiles12 = new Sprite(g_images.tiles12);
        g_sprites.tiles13 = new Sprite(g_images.tiles13);
        g_sprites.tiles14 = new Sprite(g_images.tiles14);
        g_sprites.tiles15 = new Sprite(g_images.tiles15);
        g_sprites.tiles16 = new Sprite(g_images.tiles16);
        g_sprites.tiles17 = new Sprite(g_images.tiles17);
        g_sprites.tiles18 = new Sprite(g_images.tiles18);
        g_sprites.tileskristall = new Sprite(g_images.tileskristall);
        g_sprites.tilesredbull = new Sprite(g_images.tilesredbull);
        g_sprites.tilesdot = new Sprite(g_images.tilesdot);

        entityManager.init();
        createInitialMaze();

        main.init();
    }

// Kick it off
    requestPreloads();
