let countdown;
        

document.getElementById("userDate").min = new Date().toISOString().slice(0, 16);

function setCountdown() {
    let userDate = document.getElementById("userDate").value;
    if (!userDate) return alert("Please select a valid date!");

    let finalDate = new Date(userDate).getTime();
    let now = new Date().getTime();

    if (finalDate <= now) return alert("Selected date must be in the future!");

    localStorage.setItem("eventTime", finalDate); 
    startTimer(finalDate);
}

function startTimer(finalDate) {
    clearInterval(countdown);
    countdown = setInterval(() => {
        let now = new Date().getTime();
        let d = finalDate - now;

        if (d < 0) {
            clearInterval(countdown);
            document.getElementById("days").innerHTML = "00";
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
            localStorage.removeItem("eventTime");
            return;
        }

        let days = Math.floor(d / (1000 * 60 * 60 * 24));
        let hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((d % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
    }, 1000);
}


window.onload = function() {
    let savedTime = localStorage.getItem("eventTime");
    if (savedTime) {
        let finalDate = parseInt(savedTime);
        if (finalDate > new Date().getTime()) {
            startTimer(finalDate);
        } else {
            localStorage.removeItem("eventTime"); 
        }
    }
};