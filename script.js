let countdown;
let totalSeconds = 0;
let isPaused = false;
let originalSeconds = 0;

function startTimer() {
  if (!isPaused) {
    const h = parseInt(document.getElementById('hours').value) || 0;
    const m = parseInt(document.getElementById('minutes').value) || 0;
    const s = parseInt(document.getElementById('seconds').value) || 0;

    if (h < 0 || m < 0 || s < 0) {
      showAlert("❌ Negative time is not allowed!");
      return;
    }

    totalSeconds = h * 3600 + m * 60 + s;
    originalSeconds = totalSeconds;

    if (totalSeconds <= 0) {
      showAlert("⚠️ Please enter a valid time!");
      return;
    }
  }

  isPaused = false;
  toggleContinueButton(false);
  clearInterval(countdown);

  countdown = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdown);
      document.getElementById('display').textContent = "00:00:00";
      showAlert("⏰ Time's up!");
    } else {
      totalSeconds--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
  clearInterval(countdown);
  toggleContinueButton(true);
}

function continueTimer() {
  if (totalSeconds <= 0) return;

  isPaused = false;
  toggleContinueButton(false);

  clearInterval(countdown);
  countdown = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdown);
      document.getElementById('display').textContent = "00:00:00";
      showAlert("⏰ Time's up!");
    } else {
      totalSeconds--;
      updateDisplay();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  totalSeconds = 0;
  isPaused = false;
  document.getElementById('display').textContent = "00:00:00";
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
  toggleContinueButton(false);
}

function restartTimer() {
  clearInterval(countdown);
  totalSeconds = originalSeconds;
  isPaused = false;
  toggleContinueButton(false);
  startTimer();
}

function updateDisplay() {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById('display').textContent = `${hrs}:${mins}:${secs}`;
}

function showAlert(message) {
  const alertBox = document.getElementById('alertBox');
  alertBox.textContent = message;
  alertBox.style.display = 'block';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 3000);
}

function toggleContinueButton(show) {
  document.getElementById('continueBtn').style.display = show ? 'inline-block' : 'none';
}
