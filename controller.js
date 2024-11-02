var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = parseInt(document.getElementById("choixTaille").value);
    this.currentShape = 0;
    this.isrect = 0;  

    document.addEventListener("DOMContentLoaded", function() {
        const butRect = document.getElementById("butRect");
        butRect.addEventListener("change", (event) => {
            if (butRect.checked) {
                this.isrect = 0; 
            }
        });

        const butLine = document.getElementById("butLine");
        butLine.addEventListener("change", (event) => {
            if (butLine.checked) {
                this.isrect = 1;

            }
        });
    }.bind(this));

    new DnD(canvas, this);
    
    this.onInteractionStart = function(dnd) {
        this.currColour = document.getElementById("colour").value;
		this.currLineWidth = parseInt(document.getElementById("choixTaille").value);
        this.currentShape = new Rectangle(); 
		console.log(this.currLineWidth)
    }

    this.onInteractionUpdate = function(dnd) {
        if (this.isrect === 0) {
            const width = dnd.posfinalx - dnd.posinitx;
            const height = dnd.posfinaly - dnd.posinity;
            this.currentShape = new Rectangle(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, height, width);
        } else {
            this.currentShape = new Line(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, dnd.posfinalx, dnd.posfinaly);
        }
        drawing.paint(ctx);
        this.currentShape.paint(ctx);
    }

    this.onInteractionEnd = function(dnd) {
        if (this.isrect === 0) {
            const width = dnd.posfinalx - dnd.posinitx;
            const height = dnd.posfinaly - dnd.posinity;
            this.currentShape = new Rectangle(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, height, width);
        } else {
            this.currentShape = new Line(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, dnd.posfinalx, dnd.posfinaly);
        }
        
        drawing.formes.push(this.currentShape);
        drawing.paint(ctx);
        this.addShapeToList(this.currentShape, drawing.formes.length - 1);
    }

    this.addShapeToList = function(shape, index) {
        const shapeList = document.getElementById('shapeList');
        const listItem = document.createElement('li');
        listItem.id = `shape-${index}`;
        
        const shapeDescription = `${shape instanceof Rectangle ? 'Rectangle' : 'Line'} - ${shape.couleur}`;
        listItem.innerHTML = shapeDescription;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => this.deleteShape(index);
        
        listItem.appendChild(deleteButton);
        shapeList.appendChild(listItem);
    };

    this.deleteShape = function(index) {
        drawing.formes.splice(index, 1);
        this.updateShapeList();
        drawing.paint(ctx);
    };

    this.updateShapeList = function() {
        const shapeList = document.getElementById('shapeList');
        shapeList.innerHTML = '';

        drawing.formes.forEach((shape, i) => {
            this.addShapeToList(shape, i);
        });
    };
}
