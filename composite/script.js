// Component

class Shape 
{
	constructor(x, y, c) {
		this.xPosition = x;
		this.yPosition = y;
		this.fillColor = c;
	};

	getPosition() {
		return [this.xPosition, this.yPosition];
	}

	getColor() {
		return this.fillColor;
	}

	draw(context) {};

	add() {};

	remove() {};

	getChild() {};
}


// Leaf classes 

class Circle extends Shape
{
	constructor(x, y, c) {
		super(x, y, c);
	};

    draw(context) {
      	context.beginPath();
      	context.arc(super.getPosition()[0], super.getPosition()[1], 20, 0, 2 * Math.PI, false);
      	context.fillStyle = super.getColor();
      	context.fill();
	};

	add(shape) {};
	remove() {};
	getChild(index) {};
}

class Rectangle extends Shape
{

	constructor(x, y, c) {
		super(x, y, c);
	};

    draw(context) {
      	context.beginPath();
      	context.rect(super.getPosition()[0], super.getPosition()[1], 30, 40);
     	context.fillStyle = super.getColor();
      	context.fill();
	};


	add(shape) {};
	remove() {};
	getChild(index) {};
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


var colors = ['lightsalmon', 'hotpink', 'darkorange', 'lavender', 'plum', 'seagreen', 'yellowgreen', 'lightcyan', 'wheat'];
const canvas = document.querySelector('#graphics');
const context = canvas.getContext('2d');

var shapes = new ShapeGroup();

function addShape() {
	var radios = document.getElementsByName('shape');
	var xPosition = Math.random() * canvas.width;
	var yPosition = Math.random() * canvas.height;
	var fillColor = colors[Math.floor(Math.random() * colors.length)];

	for (var i = 0, length = radios.length; i < length; i++) {
	    if (radios[i].checked) {

	        if(radios[i].value == 'circle')
	        	shapes.add(new Circle(xPosition, yPosition, fillColor));
	        else 
	        	shapes.add(new Rectangle(xPosition, yPosition, fillColor));

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

