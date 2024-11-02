
Rectangle.prototype.paint = function(ctx) {

    ctx.beginPath();
    ctx.rect(this.posx, this.posy,this.largeur, this.hauteur,this.color,this.epaisseur);
    ctx.strokeStyle = this.couleur;
    ctx.lineWidth = this.epaisseur;
    ctx.stroke();
  };
  
Line.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.posx, this.posy);
    ctx.lineTo(this.posx2, this.posy2);
    ctx.strokeStyle = this.couleur;
    ctx.lineWidth = this.epaisseur;
    ctx.stroke();
  };
  
Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.formes.forEach(function (eltDuTableau) {
      eltDuTableau.paint(ctx);
    });
    this.formes.forEach(function(eltDuTableau) {
      eltDuTableau.paint(ctx);
  });
  };
  
  
  