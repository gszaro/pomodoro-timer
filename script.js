const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const workModeBtn = document.getElementById("work-mode");
const breakModeBtn = document.getElementById("break-mode");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const beep = document.getElementById("beep");
const sessionMessage = document.getElementById("session-message");

let timer;
let isRunning = false;
let isWorkMode = true;
let remainingTime = 1500;

function updateDisplay() {
  const mins = Math.floor(remainingTime / 60);
  const secs = remainingTime % 60;
  minutesDisplay.textContent = String(mins).padStart(2, '0');
  secondsDisplay.textContent = String(secs).padStart(2, '0');
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(timer);
      isRunning = false;
      beep.play();
      sessionMessage.textContent = "Session Complete!";
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  remainingTime = isWorkMode ? 1500 : 300;
  updateDisplay();
  sessionMessage.textContent = "";
}

function setMode(work) {
  isWorkMode = work;
  resetTimer();
  workModeBtn.classList.toggle("active", work);
  breakModeBtn.classList.toggle("active", !work);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
workModeBtn.addEventListener("click", () => setMode(true));
breakModeBtn.addEventListener("click", () => setMode(false));

updateDisplay();
