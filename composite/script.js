
// Component

class Shape 
{
	draw(context) {};

	add() {};

	remove() {};

	getChild() {};
}


// Leaf classes 

class Circle extends Shape
{
    draw(context) {
      	context.beginPath();
      	context.arc(canvas.width / 2, canvas.height / 2, 20, 0, 2 * Math.PI, false);
      	context.fillStyle = 'green';
      	context.fill();
	};

	add(shape) {};
	remove() {};
	getChild(index) {};
}

class Rectangle extends Shape
{
    draw(context) {
      	context.beginPath();
      	context.rect(100, 50, 40, 80);
     	context.fillStyle = 'yellow';
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


const canvas = document.querySelector('#graphics');
const context = canvas.getContext('2d');

var shapes = new ShapeGroup();

var circle = new Circle;
var rectangle = new Rectangle;

shapes.add(circle);
shapes.add(rectangle);
shapes.draw(context);


