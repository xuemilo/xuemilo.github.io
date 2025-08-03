//target all elements to save to constants
const nav1 = document.querySelector("#nav1");
const nav2 = document.querySelector("#nav2");
const nav3 = document.querySelector("#nav3");
const nav4 = document.querySelector("#nav4");
var allpages = document.querySelectorAll(".pages");
//select all subtopic pages
function hideall() { //function to hide all pages
  for (let onepage of allpages) { //go through all subtopic pages
    onepage.style.display = "none"; //hide it
  }
}

function show(pgno) { //function to show selected page no
  hideall();
  //select the page based on the parameter passed in
  let onepage = document.querySelector("#page" + pgno);
  onepage.style.display = "block"; //show the page
}

// introduction button
//dropdown for each nav button
document.querySelector('#nav1').addEventListener('click', function () {
  const dropdown = this.nextElementSibling;
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// if pressed on another nav button , dropdown will close
document.addEventListener('click', (clickEvent) => {
  const dropdown = document.querySelector('.dropdown');
  const isClickInside = dropdown.contains(clickEvent.target);

  if (!isClickInside) {
    document.querySelector('.dropdownContent').style.display = 'none';
  }
});

// habitat button
//dropdown for each nav button
document.querySelector('#nav2').addEventListener('click', function () {
  const dropdown = this.nextElementSibling;
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// if pressed on another nav button , dropdown will close
document.addEventListener('click', (clickEvent) => {
  const dropdown = document.querySelector('.dropdown1');
  const isClickInside = dropdown.contains(clickEvent.target);

  if (!isClickInside) {
    document.querySelector('.dropdownContent1').style.display = 'none';
  }
});

// behaviour button
//dropdown for each nav button
document.querySelector('#nav3').addEventListener('click', function () {
  const dropdown = this.nextElementSibling;
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// if pressed on another nav button , dropdown will close
document.addEventListener('click', (clickEvent) => {
  const dropdown = document.querySelector('.dropdown2');
  const isClickInside = dropdown.contains(clickEvent.target);

  if (!isClickInside) {
    document.querySelector('.dropdownContent2').style.display = 'none';
  }
});

/*assign anonymous eventhandler functions to call show function*/
nav1.addEventListener("click", function () {
  show(1);
  document.getElementById("bigTitle").innerText = "Introduction"
  document.getElementById("goBackToTop").textContent = "Go Back to Top"
});

nav2.addEventListener("click", function () {
  show(2);
  document.getElementById("bigTitle").innerText = "Habitat"
  document.getElementById("goBackToTop").textContent = "Go Back to Top"
});

nav3.addEventListener("click", function () {
  show(3);
  document.getElementById("bigTitle").innerText = "Behaviour"
  document.getElementById("goBackToTop").textContent = "Go Back to Top"
});

nav4.addEventListener("click", function () {
  show(4);
  document.getElementById("bigTitle").innerText = "Species"
  document.getElementById("goBackToTop").textContent = "Go Back to Top"
});

hideall();

// hambrger menu functionality
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);
function toggleMenus() { /*open and close menu*/
  //if menuItemsList dont have the class "menuShow", add it, else remove it
  menuItemsList.classList.toggle("menuShow");
}

// parallax background
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  // adjusts the speed of each layer
  document.getElementById('bgEffectMiddle').style.transform = `translateY(${scrollPosition * 0.5}px)`;
  document.getElementById('bgEffectFront').style.transform = `translateY(${scrollPosition * 0.3}px)`;
});

// BALL
/*find references to all the buttons and ball */
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#ball");
var ballX = 0; //assign initial position of ball
var ballY = 0;

function ResetPos() {
  ballX = ballY = 0; //reset to zero
  ball.style.left = ballX + "px"; //set left property to ball x variable
  ball.style.top = ballY + "px"; //set top property to ball x variable
}

function MovePos(leftInc, topInc) {
  const scale = 0.22;
  const ballSize = ball.offsetWidth * scale;
  const mazeContainer = document.querySelector('.mazeContainer');
  const width = mazeContainer.offsetWidth;
  const height = mazeContainer.offsetHeight;

  const newX = ballX + leftInc;
  const newY = ballY + topInc;

  // boundary check before updating visually
  if (newX < 0 || newX + ballSize > width || newY < 0 || newY + ballSize > height) {
    return; // stop once outside bounds
  }

  // temporarily move ball to test for collision
  ball.style.left = newX + "px";
  ball.style.top = newY + "px";

  // reverts when colliding
  if (collisionDetected()) {
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    console.log("collided");
    return;
  }

  ballX = newX;
  ballY = newY;
  ball.style.left = ballX + "px"; // set left css property to ball x variable
  ball.style.top = ballY + "px"; // set top css property to ball y variable

  // Check for win condition after each move
  checkingCollision();
}

//eventlistener to activate MoveLeft (named callback function)
leftBtn.addEventListener("click", function () {
  MovePos(-10, 0);
}); //no brackets after MoveLeft
//eventListener to anonymous callback function (other way)
rightBtn.addEventListener("click", function () {
  MovePos(10, 0);
});
upBtn.addEventListener("click", function () {
  MovePos(0, -10);
});
downBtn.addEventListener("click", function () {
  MovePos(0, 10);
});

resetBtn.addEventListener("click", ResetPos);
document.addEventListener('keydown', function (kbEvt) {
  //kbEvt: an event object passed to callback function
  console.log(kbEvt); //see what is returned
  if (kbEvt.code === "ArrowRight") {
    MovePos(10, 0);
  }
  if (kbEvt.code === "ArrowLeft") {
    MovePos(-10, 0);
  }
  if (kbEvt.code === "ArrowDown") {
    MovePos(0, 10);
  }
  if (kbEvt.code === "ArrowUp") {
    MovePos(0, -10);
  }
});

// collision detection for div walls
const walls = document.querySelectorAll(".wall");
const player = document.querySelector("#ball");

function collisionDetect(playerCollide, wallsCollide) {
  return !(
    playerCollide.right <= wallsCollide.left ||
    playerCollide.left >= wallsCollide.right ||
    playerCollide.bottom <= wallsCollide.top ||
    playerCollide.top >= wallsCollide.bottom
  );
}

function collisionDetected() {
  const ballDimen = ball.getBoundingClientRect();

  for (const wall of walls) {
    const wallDimen = wall.getBoundingClientRect();

    if (collisionDetect(ballDimen, wallDimen)) {
      return true;
    }
  }

  return false;
}

// audio
const winSound = new Audio('audio/yayAudio.mp3');
winSound.preload = 'auto';

let gameWon = false;

function checkingCollision() {
  if (gameWon) return;

  const hamster = document.getElementById('ball').getBoundingClientRect();
  const seed = document.getElementById('winSeed').getBoundingClientRect();

  if (hamster.right >= seed.left && hamster.left <= seed.right &&
    hamster.bottom >= seed.top && hamster.top <= seed.bottom) {
    winSound.play();
    document.getElementById('gameStat').innerText = "You won!!!";
    gameWon = true;
  }
}

/* Click button to change image & text in page 4 */
const images = [
  "images/Syrian.jpg",
  "images/Campbell.jpg",
  "images/WinterWhite.jpg",
  "images/Robovoroski.jpg",
  "images/ChineseHamster.jpg"
];

const hamsterNames = [
  "Syrian Hamster",
  "Campell's Dwarf Hamster",
  "Winter White Dwarf Hamster",
  "Robovoroski Hamster",
  "Chinese Hamster"
];

const hamsterDesc = [
  "The Syrian hamster is one of the most popular pet hamsters and is known for its solitary behavior.",
  "Campbell's dwarf hamster is small and quick, and often kept in pairs if introduced young.",
  "Winter White dwarf hamsters can change their fur color to white in winter conditions.",
  "The Roborovski hamster is the smallest and fastest of all hamsters, often shy and very active.",
  "Chinese hamsters have a longer tail than other species and are often mistaken for mice."
];

let currentImage = 0;

function showNextImage() {
  currentImage = (currentImage + 1) % images.length; // loops back to first image
  document.getElementById("centerImg").src = images[currentImage];
}

function showPrevImage() {
  currentImage = (currentImage - 1 + images.length) % images.length; // loops back to first image
  document.getElementById("centerImg").src = images[currentImage];
}

function changeHamsterText() {
  document.getElementById("hamsterName").innerText = hamsterNames[currentImage];
  document.getElementById("hamsterFact").innerText = hamsterDesc[currentImage];
}

// button event listener
document.getElementById("arrowRight").addEventListener("click", function () {
  showNextImage();
  changeHamsterText();
});

document.getElementById("arrowLeft").addEventListener("click", function () {
  showPrevImage();
  changeHamsterText();
});

// animation for on scroll 
// Find a common parent container
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    setTimeout(() => entry.target.classList.toggle('show', entry.isIntersecting), 200);
  });
});

document.querySelectorAll('p, h2, .container1, .visualAid1, .visualAid2, .visualAid3, .visualAid4').forEach(el => observer.observe(el));

//for dropdown menus
const animatedBoxes2 = document.querySelectorAll('.contentAnim2');

const observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

// MCQ quiz
const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", CheckAns);
const scorebox = document.querySelector("#scorebox");
var q1, q2, q3, q4, q5, score = 0;

function CheckAns() {
  score = 0; //reset score to 0, check ans and give score if correct
  //read the value of the selected radio button for q1
  q1 = document.querySelector("input[name='q1']:checked").value;
  console.log(q1); //check q1 value retrieved
  if (q1 == "1-3 years") score++;

  //read the value of the selected radio button for q2
  q2 = document.querySelector("input[name='q2']:checked").value;
  console.log(q2); //check q2 value retrieved
  if (q2 == "Syrian Hamster") score++;

  //read the value of the selected radio button for q3
  q3 = document.querySelector("input[name='q3']:checked").value;
  console.log(q3); //check q3 value retrieved
  if (q3 == "Storing food") score++;

  q4 = document.querySelector("input[name='q4']:checked").value;
  console.log(q4); //check q4 value retrieved
  if (q4 == "Evening and Night") score++;

  q5 = document.querySelector("input[name='q5']:checked").value;
  console.log(q5); //check q5 value retrieved
  if (q5 == "Chocolate") score++;

  scorebox.innerHTML = "Score: " + score;
}

/* full screen */
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);
function enterFullscreen() { //must be called by user generated event
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
    document.documentElement.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
}
