window.onload = function() {

    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

    document.addEventListener("visibilitychange", resumeApp);

    var minutes = 0;
    var seconds = 0;
    var interval;
    var paused = false;

    const time = document.querySelectorAll(".timer");

    checkAppControl();

    document.getElementById("pomo").addEventListener("click", function() {
        startTimer(25, 0);
    });
    document.getElementById("shortPause").addEventListener("click", function() {
        startTimer(5, 0);
    });
    document.getElementById("longPause").addEventListener("click", function() {
        startTimer(10, 0);
    });
    document.getElementById("logo-img").addEventListener("click", function() {
        stateManager();
    });

    function startTimer(receivedMinutes, receivedSeconds) {
        minutes = receivedMinutes;
        seconds = receivedSeconds;

        removeAlarms();
        setAlarm(minutes, seconds);

        for (var i = 0; i < time.length; i++) {
            time[i].classList.remove("red");
        }

        unpause();

        clearInterval(interval);
        interval = setInterval(function() {
            showTimer();
        }, 1000);
    }

    function formatDisplay(value) {
        return value.toString().length !== 1 ? value : "0" + value;
    }

    function showTimer() {
        var minutesD = document.getElementById("minutes");
        var secondsD = document.getElementById("seconds");

        updateTime();

        minutesD.innerText = formatDisplay(minutes);
        secondsD.innerText = formatDisplay(seconds);
    }

    function updateTime() {
        if (minutes <= 0 && seconds <= 0) {
            finishTimer();
        } else {
            seconds = seconds - 1;

            if (seconds === -1) {
                minutes = minutes - 1;
                seconds = 59;
            }
        }
    }

    function finishTimer() {
        clearInterval(interval);

        for (var i = 0; i < time.length; i++) {
            time[i].classList.add("red");
        }

        navigator.vibrate([500, 500, 500, 500, 1000]);
    }

    function stateManager() {
        if (paused) {
            resumeTimer();
        } else {
            pauseTimer();
        }
    }

    function pauseTimer() {
        paused = true;

        document.getElementById("logo-img").src = "play.png";

        for (var i = 0; i < time.length; i++) {
            time[i].classList.add("red");
        }

        clearInterval(interval);
        removeAlarms();
    }

    function resumeTimer() {
        paused = false;
        document.getElementById("logo-img").src = "pause.png";

        for (var i = 0; i < time.length; i++) {
            time[i].classList.remove("red");
        }

        startTimer(minutes, seconds);
    }

    function unpause() {
        paused = false;
        document.getElementById("logo-img").src = "pause.png";

        for (var i = 0; i < time.length; i++) {
            time[i].classList.remove("red");
        }
    }

    function resumeApp() {
        if (!document.hidden && !paused && minutes !== 0 && seconds !== 0) {
            var remainingTime = getRemainingTime();
            if (remainingTime !== -1) {
                startTimer(Math.floor(remainingTime / 60), remainingTime % 60);
            }
        }
    }

    function getRemainingTime() {
        var alarms = tizen.alarm.getAll();
        return alarms[0] ? alarms[0].getRemainingSeconds() : -1;
    }

    function setAlarm(minutes, seconds) {
        var appId = tizen.application.getCurrentApplication().appInfo.id;
        var appControl = new tizen.ApplicationControl("http://example.tizen.org/operation/finish");
        var alarm = new tizen.AlarmRelative(minutes * tizen.alarm.PERIOD_MINUTE + seconds);

        tizen.alarm.add(alarm, appId, appControl);
    }

    function removeAlarms() {
        tizen.alarm.removeAll();
    }

    function checkAppControl() {
        var appCtrl = tizen.application.getCurrentApplication().getRequestedAppControl();
        if (appCtrl.appControl.operation.includes("finish")) {
            removeAlarms();
            finishTimer();
        }
    }
};