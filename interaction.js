
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  this.posinitx = 0;
  this.posinity = 0;
  this.posfinalx = 0;
  this.posfinaly = 0;
  this.interactor = interactor;
  this.pressed = false

	// Developper les 3 fonctions gérant les événements
  this.pression = function(evt){
    this.pressed=true
    var pos = getMousePosition(canvas,evt)
    this.posinitx = pos.x
    this.posinity = pos.y
    interactor.onInteractionStart(this)
  }.bind(this)

  this.deplacement = function(evt){
    if (this.pressed){
    var pos = getMousePosition(canvas,evt)
    this.posfinalx = pos.x
    this.posfinaly = pos.y
    
    interactor.onInteractionUpdate(this)
    }
  }.bind(this)

  this.relacher = function(evt){

    if (this.pressed){

    var pos = getMousePosition(canvas,evt)
    this.posfinalx = pos.x
    this.posfinaly = pos.y
    this.pressed = false;
    interactor.onInteractionEnd(this)
    }
  }.bind(this)

	// Associer les fonctions précédentes aux évènements du canvas.

  canvas.addEventListener("mousedown",this.pression,false)
  canvas.addEventListener("mousemove",this.deplacement,false)
  canvas.addEventListener("mouseup",this.relacher,false)
};

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



