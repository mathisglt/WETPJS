
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !
function Drawing() {
    this.formes = new Array();
}
function Forme(posx, posy, epaisseur, couleur) {
    this.posx = posx
    this.posy = posy
    this.couleur = couleur
    this.epaisseur = epaisseur
}
function Rectangle(posx, posy, epaisseur, couleur, hauteur, largeur) {
    Forme.call(this, posx, posy, epaisseur, couleur)
    this.hauteur = hauteur
    this.largeur = largeur
}
function Line(posx, posy, epaisseur, couleur, posx2, posy2) {
    Forme.call(this, posx, posy, epaisseur, couleur)
    this.posx2 = posx2
    this.posy2 = posy2
}
function Circle(posx, posy, rayon, couleur, epaisseur) {
    Forme.call(this, posx, posy, epaisseur, couleur)
    this.posx = posx;
    this.posy = posy;
    this.rayon = rayon;
    this.couleur = couleur;
    this.epaisseur = epaisseur;
}
function Triangle(p1, p2, p3, couleur, epaisseur) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.couleur = couleur;
    this.epaisseur = epaisseur;
}
