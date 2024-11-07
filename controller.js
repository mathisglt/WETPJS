var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = parseInt(document.getElementById("choixTaille").value);
    this.currentShape = 0;
    this.isrect = true;
    this.isline = false;
    this.iscircle = false;
    this.istriangle = false;

    document.addEventListener("DOMContentLoaded", function () {
        const butRect = document.getElementById("butRect");
        butRect.addEventListener("change", (event) => {
            if (butRect.checked) {
                this.isrect = !this.isrect;
                this.iscircle = this.isline = this.istriangle = false;
            }
        });

        const butLine = document.getElementById("butLine");
        butLine.addEventListener("change", (event) => {
            if (butLine.checked) {
                this.isline = !this.isline;
                this.isrect = this.iscircle = this.istriangle = false;

            }
        });
        const butCircle = document.getElementById("butCircle");
        butCircle.addEventListener("change", (event) => {
            if (butCircle.checked) {
                this.iscircle = true;
                this.isrect = this.isline = this.istriangle = false;
            }
        });

        const butTriangle = document.getElementById("butTriangle");
        butTriangle.addEventListener("change", (event) => {
            if (butTriangle.checked) {
                this.istriangle = true;
                this.isrect = this.isline = this.iscircle = false;
            }
        });
    }.bind(this));

    new DnD(canvas, this);

    this.onInteractionStart = function (dnd) {
        this.currColour = document.getElementById("colour").value;
        this.currLineWidth = parseInt(document.getElementById("choixTaille").value);
        this.currentShape = new Rectangle();
    }

    this.onInteractionUpdate = function (dnd) {
        if (this.isrect) {
            const width = dnd.posfinalx - dnd.posinitx;
            const height = dnd.posfinaly - dnd.posinity;
            this.currentShape = new Rectangle(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, height, width);
        }
        else if (this.isline) {
            this.currentShape = new Line(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, dnd.posfinalx, dnd.posfinaly);
        }
        else if (this.iscircle) {
            const x2 = dnd.posfinalx - dnd.posinitx;
            const y2 = dnd.posfinaly - dnd.posinity;
            const rayon = Math.sqrt(x2 * x2 + y2 * y2);

            this.currentShape = new Circle(dnd.posinitx, dnd.posinity, rayon, this.currColour, this.currLineWidth);
        }
        else if (this.istriangle) {
            const dx = dnd.posfinalx - dnd.posinitx;
            const dy = dnd.posfinaly - dnd.posinity;

            const p1 = { x: dnd.posinitx, y: dnd.posinity };
            const p2 = { x: dnd.posinitx + dx, y: dnd.posinity + dy };
            const p3 = { x: dnd.posinitx - dx, y: dnd.posinity + dy };

            this.currentShape = new Triangle(p1, p2, p3, this.currColour, this.currLineWidth);
        }
        drawing.paint(ctx);
        this.currentShape.paint(ctx);
    }

    this.onInteractionEnd = function (dnd) {
        if (this.isrect) {
            const width = dnd.posfinalx - dnd.posinitx;
            const height = dnd.posfinaly - dnd.posinity;
            this.currentShape = new Rectangle(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, height, width);
        }
        else if (this.isline) {
            this.currentShape = new Line(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, dnd.posfinalx, dnd.posfinaly);
        }
        else if (this.iscircle) {
            const dx = dnd.posfinalx - dnd.posinitx;
            const dy = dnd.posfinaly - dnd.posinity;
            const rayon = Math.sqrt(dx * dx + dy * dy);
            this.currentShape = new Circle(dnd.posinitx, dnd.posinity, rayon, this.currColour, this.currLineWidth);
        }
        else if (this.istriangle) {
            const dx = dnd.posfinalx - dnd.posinitx;
            const dy = dnd.posfinaly - dnd.posinity;

            const p1 = { x: dnd.posinitx, y: dnd.posinity };
            const p2 = { x: dnd.posinitx + dx, y: dnd.posinity + dy };
            const p3 = { x: dnd.posinitx - dx, y: dnd.posinity + dy };

            this.currentShape = new Triangle(p1, p2, p3, this.currColour, this.currLineWidth);
        }

        drawing.formes.push(this.currentShape);
        drawing.paint(ctx);
        this.addShapeToList(this.currentShape, drawing.formes.length - 1);
    }

    this.addShapeToList = function (shape, index) {
        const shapeList = document.getElementById('shapeList');
        const listItem = document.createElement('li');
        listItem.id = `shape-${index}`;

        let shapeDescription;
        if (shape instanceof Rectangle) {
            shapeDescription = `Rectangle - Couleur: ${shape.couleur}`;
        } else if (shape instanceof Line) {
            shapeDescription = `Ligne - Couleur: ${shape.couleur}`;
        } else if (shape instanceof Circle) {
            shapeDescription = `Cercle - Couleur: ${shape.couleur}`;
        } else if (shape instanceof Triangle) {
            shapeDescription = `Triangle - Couleur: ${shape.couleur}`;
        } else {
            shapeDescription = `Forme inconnue - Couleur: ${shape.couleur}`;
        }

        listItem.innerHTML = shapeDescription;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => this.deleteShape(index);

        listItem.appendChild(deleteButton);
        shapeList.appendChild(listItem);
    };

    this.deleteShape = function (index) {
        const listItem = document.getElementById(`shape-${index}`);
    if (listItem) {
        listItem.classList.add('suppressionsmooth');
        setTimeout(() => {
            drawing.formes.splice(index, 1);
            this.updateShapeList();
            drawing.paint(ctx);
        }, 100);
    }
    };

    this.updateShapeList = function () {
        const shapeList = document.getElementById('shapeList');
        shapeList.innerHTML = '';

        drawing.formes.forEach((shape, i) => {
            this.addShapeToList(shape, i);
        });
    };
}
