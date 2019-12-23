var world;

// A list we'll use to track fixed objects
var boundaries = [];
// A list for all of our rectangles
var boxes = [];

function setup() {

  var cnv = createCanvas(600, 200);
//  var x = (windowWidth - width) / 2;
//  var y = (windowHeight - height) / 2;
 cnv.parent('sketch-holder');
//  cnv.position(x, y);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  boundaries.push(new Boundary(2.8 * width / 4, height - 50, width / 2 - 50, 10));

  let b = new Box(width / 2, 30);
  boxes.push(b);
}

function draw() {
  background(0);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // Boxes fall from the top every so often
  if (random(2) < 0.1) {
    let b = new Box(width / 2, 30);
    boxes.push(b);
  }

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }
}
