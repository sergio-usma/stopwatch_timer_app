const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const recordList = document.getElementById('record_list');
const lapRecord = document.getElementById('lap_record');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function displayTimer() {
  millisecondsLabel.textContent = padTime(milliseconds);
  secondsLabel.textContent = padTime(seconds);
  minutesLabel.textContent = padTime(minutes);
}

function updateTimer() {
  milliseconds += 1;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
    }
  }
  displayTimer();
}

function resetTimerData() {
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer();
}

function addToRecordList() {
  const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;

  recordList.classList.remove('hidden');

  const listItem = document.createElement('li');

  listItem.innerHTML = `<button type="button" class="lap_btn">
              <span class="lap_number">Lap ${lapRecord.childElementCount + 1}</span>
              <span class="lap_time">${lapTime}</span>
            </button>`;
  lapRecord.appendChild(listItem);
}

function startTimer() {
  interval = setInterval(updateTimer, 10);
  startBtn.disabled = true;
}

function stopTimer() {
  if (minutes === 0 && seconds === 0 && milliseconds === 0) return;
  clearInterval(interval);
  addToRecordList();
  startBtn.disabled = false;
  resetTimerData();
}

function pauseTimer() {
  clearInterval(interval);
  startBtn.disabled = false;
}

function resetTimer() {
  clearInterval(interval);
  startBtn.disabled = false;
  resetTimerData();
  lapRecord.innerHTML = '';
  recordList.classList.add('hidden');
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
