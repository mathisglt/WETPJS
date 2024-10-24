
Rectangle.prototype.paint = function(ctx) {
    //TODO Manager color
    ctx.beginPath();
    ctx.rect(this.posx, this.posy,this.largeur, this.hauteur,this.color,this.epaisseur);
    ctx.strokeStyle = this.couleur;
    ctx.stroke();
  };
  
Line.prototype.paint = function(ctx) {
    //TODO Manager color
    ctx.beginPath();
    ctx.moveTo(this.posx, this.posy);
    ctx.lineTo(this.posx2, this.posy2);
    ctx.strokeStyle = this.couleur;
    ctx.stroke();
  };
  
Drawing.prototype.paint = function(ctx) {
    //console.log(this.getForms());
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.formes.forEach(function (eltDuTableau) {
      eltDuTableau.paint(ctx);
    });
    this.formes.forEach(function(eltDuTableau) {
      eltDuTableau.paint(ctx);
  });
  };
  
  
  