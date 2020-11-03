// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/l7PUc4bBq/";
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

let hat;
let flex;

// function sayItMonique() {
//   let stunningAudio = new Audio("./sound/noBitch.wav")
//   stunningAudio.play()
//   noLoop()
//   loop()
// }

let mySound;

// Load the model first
function preload() {
  // soundFormats(".wav")
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  question = loadImage("../img/question.png");
  yes = loadImage("../img/yes.png");
  no = loadImage("../img/no.png");
  hat = loadImage(
    "../img/kisspng-straw-hat-cap-cowboy-hat-sun-hat-raffia-hat-png-file-5a7164bd8da9e1.6508958715173807975803.png"
  );
  flex = loadImage(
    "../img/IMGBIN_strong-bads-cool-game-for-attractive-people-homestar-runner-the-brothers-chaps-png_3Z62e96k.png"
  );
  // mySound = loadSound("./sound/noBitch.wav")
}

function setup() {
  // createCanvas(1080, 720);
  // // Create the video
  // video = createCapture(VIDEO);
  // video.size(1080, 700);
  // video.hide();

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
  sel.option("Select Gesture")
  for (let i = 0; i < selectList.length; i++) {
    sel.option(selectList[i])
  }
  input = createElement("input");
  input.attribute("type", "file");
}

function draw() {
  background(0);
  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);

  // if (document.getElementsByTagName("input")[0].files[0] && label === "Question") {
  //   image(question, 20, 30, 200, 200);
  // }
  if (label === "hand up") {
    image(question, 20, 30, 400, 400);
  }

  if (label === "Thumbs up") {
    yesFade = 255;
    image(yes, 20, 30, 400, 400);
  }

  if (label === "Thumbs down") {
    noFade = 255;
    image(no, 20, 30, 400, 400);
  }

  if (label === "cute") {
    image(hat, 75, -150, 650, 650);
  }

  if (label === "flex") {
    image(flex, 20, 30, 400, 400);
  }

  // if (questionFade >= 0) {
  //   tint(255, questionFade)
  //   image(question, 20, 30, 200, 200);
  //   questionFade -= 10
  // }

  // if (yesFade > 0) {
  //   tint(255, yesFade)
  //   image(yes, 20, 30, 200, 200);
  //   yesFade -= 10;
  // }

  // if (noFade > 0) {
  //   tint(255, noFade)
  //   image(no, 20, 30, 200, 200);
  //   noFade -= 10;
  // }

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
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
  // if (document.getElementsByTagName("input")[0].files[0]) {

  //   question = "./img/" + document.getElementsByTagName("input")[0].files[0].name
  //   console.log(question);
  // }
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
