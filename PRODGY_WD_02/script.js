let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}
