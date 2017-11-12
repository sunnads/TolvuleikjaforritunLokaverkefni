// =========
// ASTEROIDS
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
// CREATE INITIAL SHIPS
// ====================

function createInitialMaze() {

   /* entityManager.generateShip({
        cx : 200,
        cy : 200
    });
*/
    entityManager.generateMaze({
    });
    
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();

    entityManager.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

    var KEY_HALT = keyCode('H');
    var KEY_RESET = keyCode('R');


    function processDiagnostics() {


        if (eatKey(KEY_HALT)) entityManager.haltGame();

        if (eatKey(KEY_RESET)) entityManager.resetGame();

    }


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


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
            patman1: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/patman1.png",
            patman2: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/patman2.png",
            patman3: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/patman3.png",
            // tiles0    : "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles0.jpg",
            tiles1: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles1.jpg",
            tiles2: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles2.jpg",
            tiles3: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles3.jpg",
            tiles4: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles4.jpg",
            tiles5: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles5.jpg",
            tiles6: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles6.jpg",
            tiles7: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles7.jpg",
            tiles8: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles8.jpg",
            tiles9: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles9.jpg",
            tiles10: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles10.jpg",
            tiles11: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles11.jpg",
            tiles12: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles12.jpg",
            tiles13: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles13.jpg",
            tiles14: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles14.jpg",
            tiles15: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles15.jpg",
            tiles16: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles16.jpg",
            tiles17: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles17.jpg",
            tiles18: "https://notendur.hi.is/ksh18/Tolvuleikjaforritun/pacman_sprites/tiles18.jpg"

        };

        imagesPreload(requiredImages, g_images, preloadDone);
    }

    var g_sprites = {};

    function preloadDone() {

        g_sprites.patman1 = new Sprite(g_images.patman1);
        g_sprites.patman2 = new Sprite(g_images.patman2);
        g_sprites.patman3 = new Sprite(g_images.patman3);

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

        entityManager.init();
        createInitialMaze();

        main.init();
    }

// Kick it off
    requestPreloads();
