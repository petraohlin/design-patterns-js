
var position = Symbol();
var color = Symbol();


// Component
class Shape 
{
	constructor(x, y, c) {
		this[position] = [x, y];
		this[color] = c;
	};

	get position() {
		return this[position];
	}

	get color() {
		return this[color];
	}

	// Functions used in Leaf classes 
	// ------------------------------
	// draw(context) {};

	// Functions used in the Composite class
	// -------------------------------------
	// add() {};
	// remove() {};
	// getChild() {};
}


// Leaf classes 
class Circle extends Shape
{
	constructor(x, y, c) {
		super(x, y, c);
	};

    draw(context) {
      	context.beginPath();
      	context.arc(super.position[0], super.position[1], 20, 0, 2 * Math.PI, false);
      	context.fillStyle = super.color;
      	context.fill();
	};
}

class Rectangle extends Shape
{
	constructor(x, y, c) {
		super(x, y, c);
	};

    draw(context) {
      	context.beginPath();
      	context.rect(super.position[0], super.position[1], 30, 40);
     	context.fillStyle = super.color;
      	context.fill();
	};
}

// Composite class
class ShapeGroup extends Shape
{
	constructor(context) {
		super();
		this.shapes = [];
	}

	draw(context) {
		for (var i in this.shapes) {
		  this.shapes[i].draw(context);
		}
	};

	add(shape) 
	{
		this.shapes.push(shape);
	};

	remove() 
	{
		this.shapes.pop();
	};

	getChild(index) 
	{
		return this.shapes[index];
	};
}

// Program Variables
var colors = ['lightsalmon', 'hotpink', 'darkorange', 'lavender', 'plum', 'seagreen', 'yellowgreen', 'lightcyan', 'wheat'];
const canvas = document.querySelector('#graphics');
const context = canvas.getContext('2d');
var shapes = new ShapeGroup();

// Program Functions
function addShape() {
	var radios = document.getElementsByName('shape');
	var xPosition = Math.random() * canvas.width;
	var yPosition = Math.random() * canvas.height;
	var fillColor = colors[Math.floor(Math.random() * colors.length)];

	for (var i = 0; i < radios.length; i++) {
	    if (radios[i].checked) {

	        if(radios[i].value == 'circle')
	        	shapes.add(new Circle(xPosition, yPosition, fillColor));
	        else if(radios[i].value == 'rectangle')
	        	shapes.add(new Rectangle(xPosition, yPosition, fillColor));
	        else {
	        	var tempShapes = new ShapeGroup();
	        	tempShapes.add(new Circle(xPosition, yPosition+20, fillColor));
	        	tempShapes.add(new Rectangle(xPosition+20, yPosition, fillColor));
	        	shapes.add(tempShapes);
	        }
	        	

	        shapes.draw(context);
	        break;
	    }
	}

}

function removeShape() {
	shapes.remove();
	context.clearRect(0, 0, canvas.width, canvas.height);
	shapes.draw(context);
}

