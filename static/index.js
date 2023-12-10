// Scrimba Project: Basketball Scoreboard


// .......................................................................................
// Chronometer:
// practice w3schools space https://spaces.w3schools.com/space/js-chronometer/editor
let date;
let startTime;
let newTime;
let savedElapsedTime = 0;
let newElapsedTime;
let chronoIntervalID;
let chronoState = "stopped";
console.log(`initial chrono state is: ${chronoState}`);

// calculate and update seconds, minutes, hours on the displayed chronometer
function displayChrono(time) {
    let seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
    let minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, "0");
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
    document.getElementById("display-chronometer").innerHTML = `${hours}:${minutes}:${seconds}`;
}

// the time displayed by the chronometer after start = ... 
// ... = the elapsed time between the present time, updated every second, ...
// ... and the moment when the chronometer was started + ...
// ... + if the chronometer was paused, the elapsed time until the pause
function startChrono() {
    date = new Date();
    let startTime = date.getTime(); 

    chronoIntervalID = setInterval( () => {
        date = new Date();
        newTime = date.getTime();
        newElapsedTime = savedElapsedTime + newTime - startTime;
        displayChrono(newElapsedTime);
    }, 1000 );
}

// clear the interval of the startChrono() function
// the time when the chronometer is stopped is saved into the savedElapsedTime variable
function stopChrono() {
    savedElapsedTime = newElapsedTime;  
    clearInterval(chronoIntervalID);
}

// main function for running the Chronometer, call the start or the stop functions ...
// ... according to the state of the chronometer ...
// ... update the state variable and the Start btn
function runChrono() {
    if (chronoState === "stopped") {
        chronoState = "started";
        console.log(`chrono state was changed to: ${chronoState}`);
        document.getElementById("chrono-start-btn").innerHTML = "STOP";
        startChrono();
    } else if (chronoState === "started") {
        chronoState = "stopped";
        console.log(`chrono state was changed to: ${chronoState}`);
        document.getElementById("chrono-start-btn").innerHTML = "RESUME";
        stopChrono();
    }
}

// stop and reset the chronometer, update the elapsed time variables, the display and the Start btn
function resetChrono() {
    chronoState = "stopped";
    console.log("chronoState");
    clearInterval(chronoIntervalID);
    savedElapsedTime = 0;
    newElapsedTime = 0;
    document.getElementById("display-chronometer").innerHTML = "00:00:00";
    document.getElementById("chrono-start-btn").innerHTML = "START";

}

// .......................................................................................
// HOME & GUEST:

// get the buttons that add points
let addBtn = document.getElementsByClassName("add-btn");
// get the buttons that resets scores
let resetBtn = document.getElementsByClassName("reset-btn");
// get the elements which display the messages
let messages = document.getElementsByClassName("message");

// function for adding buttons: add the number of points written on the button (the argument of the function) to home/guest score 
// the home/guest store is the second child of the parent of the parent of the clicked button)  
function addPoints(btn) {
    // get the parent (with the class home or guest) of the clicked button (btn = the argument)
    let parent = btn.parentNode.parentNode;

    // convert the number of points written on the button from string to number  
    let numToAdd = btn.innerHTML * 1;
    
    // get the score corresponding to the parent element (with class home or guest)
    let scoreText = parent.children[1];

    // add the points written on the clicked button to the score corresponding to the parent element
    let totalScore = scoreText.innerText * 1 + numToAdd;

    // convert the score to string and add 0s in front of it, to obtain a string of 3 characters 
    scoreText.innerText = totalScore.toString().padStart(3, "0");

    // get the name of the parent element of the clicked button to add it to the message
    let parentName = parent.children[0].innerText;

    // get the time when the points are added
    let displayTime = document.getElementById("display-chronometer").innerText.slice(3);

    // get the message paragraph
    let message = parent.children[4];

    // display a message with the number of points added and the team
    message.innerHTML += `<p><span>${displayTime}</span>  ${btn.innerText} point${numToAdd == 1 ? "" : "s"} ${parentName} Team!</p>`;

    // delete the first message of the list(array) of messages after 5s
    setTimeout(() => { 
        if (message.children.length > 1) { message.children[0].remove() }
     }, 5000);

    // delete the last message after 10 min
    setTimeout(() => { 
        if (message.children.length > 0 ) { message.children[0].remove() } 
    }, 60000);
}

// function that resets the score corresponding to the button that was clicked (the argument of the function) 
function reset(btn) {
    btn.parentNode.children[1].innerHTML = "000";
    btn.parentNode.children[4].innerHTML = "";
}

// add an event listenter to addPoints() function for all the buttons that add points, from home and guest 
for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", () => addPoints(addBtn[i]));
}

// add an event that listens to reset() function to the buttons that resets, from home and guest
for (let i = 0; i < resetBtn.length; i++) {
    resetBtn[i].addEventListener("click", () => reset(resetBtn[i]));
}
