
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currentShape = 0;
	this.isrect = 0
	document.addEventListener("DOMContentLoaded", function() {
		const butRect = document.getElementById("butRect");
		butRect.addEventListener("change", (event) => {
			if (butRect.checked) {
				this.isrect = 0;  // Rectangle sélectionné
				console.log("Rectangle sélectionné");
			}
		});
	
		const butLine = document.getElementById("butLine");
		butLine.addEventListener("change", (event) => {
			if (butLine.checked) {
				this.isrect = 1;  // Ligne sélectionnée
				console.log("Ligne sélectionnée");
			}
		});
	}.bind(this)); 
		

	new DnD(canvas, this);
	this.onInteractionStart = function(dnd){
		this.currColour = document.getElementById("colour").value;
		console.log("start")
		console.log(this.currColour)
		this.currentShape = new Rectangle();
	}
	this.onInteractionUpdate = function(dnd) {
		var isrect = document.getElementById('butRect');
		if (this.isrect == 0){
			var largeur = dnd.posfinalx - dnd.posinitx;
			var hauteur = dnd.posfinaly - dnd.posinity
			this.currentShape = new Rectangle(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, hauteur, largeur);
		}
		else {
			this.currentShape = new Line(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, dnd.posfinalx, dnd.posfinaly);
		}
		drawing.paint(ctx)
		this.currentShape.paint(ctx)
	}
	
	this.onInteractionEnd = function(dnd) {
		if (this.isrect == 0) {
			this.currentShape = new Rectangle(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, dnd.posfinaly - dnd.posinity, dnd.posfinalx - dnd.posinitx);
		} else {
			this.currentShape = new Line(dnd.posinitx, dnd.posinity, this.currLineWidth, this.currColour, dnd.posfinalx, dnd.posfinaly);
		}
		drawing.formes.push(this.currentShape)
		drawing.paint(ctx)
//		this.currentShape.paint(ctx)
		this.addShapeToList(this.currentShape, drawing.formes.length - 1);
	}

	this.addShapeToList = function(shape, index) {
		const shapeList = document.getElementById('shapeList');
		const listItem = document.createElement('li');
		listItem.id = `shape-${index}`;

		const shapeDescription = `${shape instanceof Rectangle ? 'Rectangle' : 'Line'} - ${shape.couleur} -  x: ${shape.posfinalx} y: ${shape.posinity}`;
		listItem.innerHTML = shapeDescription;
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Supprimer';
		deleteButton.onclick = () => this.deleteShape(index);
	
		listItem.appendChild(deleteButton);
		shapeList.appendChild(listItem);
	};
	this.deleteShape = function(index) {
		drawing.formes.splice(index, 1);
		document.getElementById(`shape-${index}`).remove();
		drawing.paint(ctx);
	};

	
};


