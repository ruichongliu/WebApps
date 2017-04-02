/*
	TODO: Store references to the DOM objects in variables below
*/
var timerDiv = document.getElementById("timer");		// Where we will display the time
var btns = document.getElementsByTagName("button")
var startBtn = btns[0];		// When clicked, start or resume timer
var pauseBtn = btns[1];		// When clicked, pause timer
var resetBtn = btns[2];		// When clicked, reset timer to original status
var timesetBtn = btns[3];
var audios = document.getElementsByTagName("audio")
var tickAudio = audios[0];		// Play once per second while the timer counts down
var alarmAudio = audios[1];		// Play repeatedly when timer reaches 00:00:00,
					// until pause or reset is pressed (for simplicity)
/*
	TODO: Set initial values to the variables below
*/
var secDuration = 3;	// How long the timer is set, in seconds
var running = false;	// A boolean

var temptime = secDuration; //Copy of default for future use
var myTimer;                //ID of setInterval for countdown
var myAlarm;                //ID of setInterval for alarm
/*
	TODO: Figure what this one may be used for (later)
*/
var timerInterval = 1000;

/*
	TODO: getTimeString takes in a number of seconds and return
	a time string in the format "hh+:mm:ss" (2 or more digits for hours,
	2 digits for minutes, 2 digits for seconds)

	Example: 	getTimeString(10) => "00:00:10"
				getTimeString(12000) => "03:36:45"
*/
function getTimeString(totalSeconds) {
    hours = Math.floor(totalSeconds/60/60);
    minutes = Math.floor(totalSeconds/60)%60;
    seconds = totalSeconds%60;
    function addzero(val) {
        if (val < 10) {return '0'+val}
        else {return val}
        }
	return addzero(hours)+':'+addzero(minutes)+':'+addzero(seconds);
};

/*
	TODO: render(displayDiv, totalSeconds) displays the totalSeconds
	in "hh+:mm:ss" format in the browser where displayDiv is
*/
function render(displayDiv, totalSeconds) {
	displayDiv.innerHTML = "<h1>"+getTimeString(totalSeconds)+"</h1>"
};

/*
	TODO: Write functions that correspond to the specs of our buttons
*/

function countdown() {
    if (temptime === 0) {
        clearInterval(myTimer);
        running = false;
        myAlarm = setInterval(function(){alarmAudio.play();},750);
        return
        };
    running = true;
    temptime -= 1;
    render(timerDiv, temptime);
    tickAudio.play();
}
startBtn.addEventListener('click', function(e) {
    if (running === true) {return};
	myTimer = setInterval(countdown,timerInterval);
});
pauseBtn.addEventListener('click', function(e) {
    clearInterval(myAlarm);
	clearInterval(myTimer);
    running = false;
});
resetBtn.addEventListener('click', function(e) {
    clearInterval(myAlarm);
	clearInterval(myTimer);
    running = false;
    temptime = secDuration;
    render(timerDiv, temptime);
});
timesetBtn.addEventListener('click', function(e){
    var newtime = prompt("Please enter new countdown time", "hh:mm:ss");
    if(newtime == null) {return;};
    secDuration = ((newtime[0]*10+ +newtime[1])*3600+ +
    (newtime[3]*10+ +newtime[4])*60+ +newtime[6]*10+ +newtime[7]);
    render(timerDiv,secDuration);
    temptime = secDuration;
})
/*
	TODO: Uncomment the line below when you have implemented render
*/
render(timerDiv, secDuration);
