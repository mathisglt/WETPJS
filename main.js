

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width=800
canvas.height=600

// Code temporaire pour tester le DnD
// new DnD(canvas);

ctx.fillStyle = '#F0f0f0'; // set canvas' background color
ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
/////



// Code final à utiliser pour manipuler Pencil.
var drawing = new Drawing();
var pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx, canvas);

