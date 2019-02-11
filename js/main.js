
window.onload = function () {
	
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back"){
			try {
			    tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
        }
    });

	var minutes = 0;
	var seconds = 0;
	var interval;
	var paused = false;
	
	document.getElementById("pomo").addEventListener("click", function(){startTimer(25,0);});
	document.getElementById("shortPause").addEventListener("click", function(){startTimer(5,0);});
	document.getElementById("longPause").addEventListener("click", function(){startTimer(10,0);});
	document.getElementById("logo-img").addEventListener("click", function(){stateManager();});

	function startTimer(receivedMinutes, receivedSeconds){
		minutes = receivedMinutes;
		seconds = receivedSeconds;
		
		unpause();
		
		clearInterval(interval);
		interval = setInterval(function(){
			showTimer();
			}, 1000);
	}
	
	function formatDisplay(value){
		return value.toString().length !== 1 ? value : "0" + value;
	}
	
	function showTimer(){
		var minutesD = document.getElementById("minutes");
		var secondsD = document.getElementById("seconds");
				
		updateTime();
		
		minutesD.innerText = formatDisplay(minutes);
		secondsD.innerText = formatDisplay(seconds);
	}
	
	function updateTime(){
		seconds = seconds - 1;
		
		if(seconds === -1){
			minutes = minutes - 1;
			seconds = 59;
		}
		
		if(minutes === 0 && seconds === -1){
			finishTimer();
		}
	}
	
	function finishTimer(){
		clearInterval(interval);
		navigator.vibrate(3000);
	}
	
	function stateManager(){
		if(paused){
			resumeTimer();
		} else {
			pauseTimer();
		}
	}
	
	function pauseTimer(){
		paused = true;
		document.getElementById("logo-img").src = "play.png";
		
		var time = document.querySelectorAll(".timer");
		for(var i = 0; i<time.length; i++){
			time[i].classList.add("red");
		}
		
		clearInterval(interval);
	}
	
	function resumeTimer(){
		paused = false;
		document.getElementById("logo-img").src = "pause.png";
		
		var time = document.querySelectorAll(".timer");
		for(var i = 0; i<time.length; i++){
			time[i].classList.remove("red");
		}
		
		startTimer(minutes,seconds);
	}
	
	function unpause(){
		paused = false;
		document.getElementById("logo-img").src = "pause.png";
		
		var time = document.querySelectorAll(".timer");
		for(var i = 0; i<time.length; i++){
			time[i].classList.remove("red");
		}
	}
    
};
