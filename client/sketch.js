// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/DTvqHq4AT/";
let header;
// Video
let video;
let input;
let flippedVideo;
let outputWidth;
let outputHeight;
// To store the classification
let label = "";

let question;
let questionFade = 1;

let yes;
let yesFade = 0;

let no;
let noFade = 0;

let cute;
let flex;
let y;
let m;
let c;
let a;
let p;

// Load the model first
function preload() {
  // soundFormats(".wav")
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  question = loadImage("../img/question.png");
  yes = loadImage("../img/yes.png");
  no = loadImage("../img/no.png");
  cute = loadImage(
    "../img/kisspng-straw-hat-cap-cowboy-hat-sun-hat-raffia-hat-png-file-5a7164bd8da9e1.6508958715173807975803.png"
  );
  flex = loadImage(
    "../img/IMGBIN_strong-bads-cool-game-for-attractive-people-homestar-runner-the-brothers-chaps-png_3Z62e96k.png"
  );
  y = loadImage("../img/y.png");
  m = loadImage("../img/m.png");
  c = loadImage("../img/c.png");
  a = loadImage("../img/a.png");
}

function setup() {
  const maxWidth = Math.min(windowWidth, windowHeight);
  pixelDensity(1);
  outputWidth = maxWidth;
  outputHeight = maxWidth * 0.75; // 4:3

  createCanvas(outputWidth, outputHeight);
  // outputWidth = 969
  // outputHeight = 726

  // webcam capture
  video = createCapture(VIDEO);
  video.size(outputWidth, outputHeight);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
  p = createP("You can even change the images of the gestures! Try it out!");
  p.attribute("class", "bottomText");
  const sel = createSelect();
  const selectList = [
    "One hand up",
    "Two thumbs up",
    "Two thumbs down",
    "Hands under chin",
    "Flex",
    "Y",
    "M",
    "C",
    "A",
  ];
  sel.option("Select Gesture");
  for (let i = 0; i < selectList.length; i++) {
    sel.option(selectList[i]);
  }
  sel.attribute("onchange", "scrollMenu()");
  input = createElement("input");
  input.attribute("type", "file");
}

function draw() {
  background(0);
  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);

  if (label === "One hand up") {
    image(question, 20, 30, 400, 400);
  }

  if (label === "Two thumbs up") {
    yesFade = 255;
    image(yes, 20, 30, 400, 400);
  }

  if (label === "Two thumbs down") {
    noFade = 255;
    image(no, 20, 30, 400, 400);
  }

  if (label === "Hands under chin") {
    image(cute, 75, -150, 650, 650);
  }

  if (label === "Flex") {
    image(flex, 20, 30, 400, 400);
  }

  if (label === "Y") {
    image(y, 50, -30, 800, 800);
  }

  if (label === "M") {
    image(m, 50, -30, 800, 800);
  }

  if (label === "C") {
    image(c, 50, -30, 800, 800);
  }

  if (label === "A") {
    image(a, 50, -30, 800, 800);
  }

  // Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }

  // The results are in an array ordered by confidence.
  label = results[0].label;

  // Classifiy again!
  classifyVideo();
}

function changeFile(gesture) {
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      if (gesture === "Flex") {
        flex = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }

      if (gesture === "Hands under chin") {
        flex = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }

      if (gesture === "Y") {
        y = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }

      if (gesture === "M") {
        m = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }

      if (gesture === "C") {
        c = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }

      if (gesture === "A") {
        a = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }

      if (gesture === "One hand up") {
        question = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }

      if (gesture === "Two thumbs up") {
        yes = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }

      if (gesture === "Two thumbs down") {
        no = loadImage(reader.result);
        alert(`You changed the image for ${gesture}!`);
      }
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
    console.log(reader.readAsDataURL(file));
  }
}

function scrollMenu() {
  if (document.getElementsByTagName("select")[0].value !== "Select Gesture") {
    input.attribute(
      "onchange",
      `changeFile(document.getElementsByTagName("select")[0].value)`
    );
  }
}
