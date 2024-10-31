let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

function toggleStartStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0); // Adjust for any previous difference
        tInterval = setInterval(updateTime, 1);
        running = true;
        document.getElementById("startStopBtn").innerText = "Stop";
        document.getElementById("lapBtn").disabled = false; // Enable the lap button
    } else {
        clearInterval(tInterval);
        running = false;
        document.getElementById("startStopBtn").innerText = "Start";
        document.getElementById("lapBtn").disabled = true; // Disable the lap button
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    lapCount = 0;
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("startStopBtn").innerText = "Start";
    document.getElementById("lapBtn").disabled = true; // Disable the lap button
    document.getElementById("lapList").innerHTML = ""; // Clear lap list
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("display").innerText = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
}

function recordLap() {
    lapCount++;
    const lapTime = document.getElementById("display").innerText;
    const lapList = document.getElementById("lapList");
    const lapItem = document.createElement("li");
    lapItem.innerText = "Lap " + lapCount + ": " + lapTime;
    lapList.appendChild(lapItem);
}
