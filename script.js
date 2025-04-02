const clock_btn = document.querySelector('.clock-btn');
const alarm_btn = document.querySelector('.alarm-btn');
const stopwatch_btn = document.querySelector('.stopwatch-btn');
const timer_btn = document.querySelector('.timer-btn');

const clockContainer = document.querySelector('.clock-container');
const alarmContainer = document.querySelector('.alarm-container');
const timerContainer = document.querySelector('.timer-container');
const stopwatchContainer = document.querySelector('.stopwatch-container');

const days = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  0: 'Sunday',
};
const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
function removeAll() {
  clockContainer.style.display = 'none';
  alarmContainer.style.display = 'none';
  timerContainer.style.display = 'none';
  stopwatchContainer.style.display = 'none';
}
function display_clock() {
  removeAll();
  clockContainer.style.display = 'flex';

  document.querySelectorAll(".btns button").forEach(btn => btn.classList.remove("active-btn"));

    // Add active class to alarm button
    clock_btn.classList.add("active-btn");

  const hours_box = document.querySelector('.hours');
  const minutes_box = document.querySelector('.minutes');
  const seconds_box = document.querySelector('.seconds');
  const ampm_box = document.querySelector('.am-pm');
  const day_box = document.querySelector('.day');
  const month_box = document.querySelector('.month');
  const date_box = document.querySelector('.date');
  setInterval(() => {
    let d = new Date();
    let date = d.getDate();
    let day = d.getDay();
    let year = d.getFullYear();
    let month = d.getMonth();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12;
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    hours_box.innerText = hour;
    minutes_box.innerText = minutes;
    seconds_box.innerText = seconds;
    ampm_box.innerText = ampm;

    day_box.innerText = days[day];
    month_box.innerText = months[month + 1];
    date_box.innerText = date;
  }, 1000);
}

function display_alarm() {
  removeAll();
  alarmContainer.style.display = 'flex';
  document.querySelectorAll(".btns button").forEach(btn => btn.classList.remove("active-btn"));

    // Add active class to alarm button
    alarm_btn.classList.add("active-btn");


  const hours_box = document.querySelector('.alarm-hours');
  const minutes_box = document.querySelector('.alarm-minutes');
  const seconds_box = document.querySelector('.alarm-seconds');
  const ampm_box = document.querySelector('.alarm-am-pm');

  setInterval(() => {
    let d = new Date();

    let hour = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12;
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    hours_box.innerText = hour;
    minutes_box.innerText = minutes;
    seconds_box.innerText = seconds;
    ampm_box.innerText = ampm;


  }, 1000);

  const alarmSound = new Audio("Assets/clock-alarm-8761.mp3");

  const hourSelect = document.querySelector(".set-hour");
  const minuteSelect = document.querySelector(".set-minutes");
  const setAMPM = document.querySelector(".set-am-pm");

  const setAlarm = document.querySelector(".set-alarm");

  setAlarm.addEventListener("click", () => {

    const hourValue = parseInt(hourSelect.value);
    const minuteValue = parseInt(minuteSelect.value);
    const ampmValue = setAMPM.value;

    if (isNaN(hourValue) || isNaN(minuteValue) || ampmValue === "") alert("Please set a valid time for the alarm. Make sure all fields are selected.");
    else {
      const alarmTime = `${hourValue}:${minuteValue} ${ampmValue}`;
      const alarmTime24 = convertTo24HourFormat(hourValue, ampmValue);
      const alarmDate = new Date();
      alarmDate.setHours(alarmTime24, minuteValue, 0, 0); // Set alarm date
      alert(`Alarm set for ${alarmTime}`);

      // Calculate the time difference between now and the alarm time
      const currentTime = Date.now();
      let timeDifference = alarmDate.getTime() - currentTime;
      if (timeDifference < 0) {
        timeDifference += 24 * 60 * 60 * 1000;
      }
      setTimeout(() => {
        alarmSound.play(); // Play the alarm sound
        // alert("⏰ Alarm is ringing!");

      }, timeDifference)
      console.log(timeDifference);

    }
  })

}
function display_timer() {
  removeAll();
  timerContainer.style.display = 'flex';

  document.querySelectorAll(".btns button").forEach(btn => btn.classList.remove("active-btn"));

    // Add active class to alarm button
    timer_btn.classList.add("active-btn");

  const timerPause = document.getElementById("timer-pause");
  const timerPlay = document.getElementById("timer-play");
  const timerCancel = document.getElementById("timer-cancel");

  const inputH = document.getElementById("timer-h");
  const inputM = document.getElementById("timer-m");
  const inputS = document.getElementById("timer-s");

  timerPause.style.display = "none";
  timerCancel.style.display = "none";
  timerPlay.style.display = "flex";

  timerPlay.disabled = true; // Initially disabled

  let timerInterval; // To store setInterval reference

  // Function to validate input and format it as 2-digit
  function validateInput(input) {
    let value = parseInt(input.value, 10);

    if (isNaN(value) || value < 0) {
      input.value = ""; // Keep it empty to check later
    } else {
      input.value = value < 10 ? "0" + value : value; // Ensure 2-digit format
    }
    checkPlayButton(); // Check if Play should be enabled
  }

  // Function to check if Play button should be enabled
  function checkPlayButton() {
    timerPlay.disabled = !(inputH.value || inputM.value || inputS.value);
  }

  // Add event listeners for input validation
  [inputH, inputM, inputS].forEach((input) => {
    input.addEventListener("input", () => validateInput(input));
  });

  // When Play button is clicked
  timerPlay.addEventListener("click", () => {
    // Set empty fields to "00"
    if (inputH.value === "") inputH.value = "00";
    if (inputM.value === "") inputM.value = "00";
    if (inputS.value === "") inputS.value = "00";

    const hours = parseInt(inputH.value, 10) || 0;
    const minutes = parseInt(inputM.value, 10) || 0;
    const seconds = parseInt(inputS.value, 10) || 0;

    let time = hours * 3600 + minutes * 60 + seconds;

    if (time === 0) return; // Don't start if no valid input

    // Hide Play, Show Pause & Cancel
    timerPlay.style.display = "none";
    timerPause.style.display = "flex";
    timerCancel.style.display = "flex";

    // Disable Inputs when Timer Starts
    inputH.disabled = true;
    inputM.disabled = true;
    inputS.disabled = true;

    // Start Countdown
    timerInterval = setInterval(() => {
      if (time <= 0) {
        clearInterval(timerInterval);
        timerPause.style.display = "none";
        timerPlay.style.display = "flex";
        timerCancel.style.display = "none";

        // Enable inputs after timer ends
        inputH.disabled = false;
        inputM.disabled = false;
        inputS.disabled = false;

        return;
      }

      time--;

      // Calculate remaining time
      let remainingH = Math.floor(time / 3600);
      let remainingM = Math.floor((time % 3600) / 60);
      let remainingS = time % 60;

      // Update input fields
      inputH.value = remainingH.toString().padStart(2, "0");
      inputM.value = remainingM.toString().padStart(2, "0");
      inputS.value = remainingS.toString().padStart(2, "0");

    }, 1000);
  });

  // When Cancel button is clicked
  timerCancel.addEventListener("click", () => {
    clearInterval(timerInterval);

    // Reset Timer UI
    inputH.value = "";
    inputM.value = "";
    inputS.value = "";
    inputH.disabled = false;
    inputM.disabled = false;
    inputS.disabled = false;

    timerPause.style.display = "none";
    timerCancel.style.display = "none";
    timerPlay.style.display = "flex";
    timerPlay.disabled = true;
  });

  // When Pause button is clicked
  timerPause.addEventListener("click", () => {
    clearInterval(timerInterval);

    timerPause.style.display = "none";
    timerPlay.style.display = "flex";
    timerCancel.style.display = "flex";
  });
}

function display_stopwatch() {
  removeAll();
  stopwatchContainer.style.display = 'flex';

  document.querySelectorAll(".btns button").forEach(btn => btn.classList.remove("active-btn"));

    // Add active class to alarm button
    stopwatch_btn.classList.add("active-btn");

  let time = 0;
  let stopInterval = null;

  const stopPlay = document.getElementById("stop-play");
  const stopPause = document.getElementById("stop-pause");
  const stopReset = document.getElementById("stop-reset");
  stopPlay.style.display = "flex";
  stopPause.style.display = "none";
  stopReset.style.display = "none";
  stopReset.disabled = true;

  function updateTimeDisplay() {
    const stopM = document.getElementById("stop-m");
    const stopS = document.getElementById("stop-s");
    const stopMS = document.getElementById("stop-ms");

    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor(time / 1000) % 60;
    let minutes = Math.floor(time / (1000 * 60)) % 60;
    // let hours = Math.floor(time / (1000 * 60 * 60));

    // stopH.innerText=hours.toString();
    stopM.innerText = minutes.toString().padStart(2, '0');
    stopS.innerText = seconds.toString().padStart(2, '0');
    stopMS.innerText = milliseconds.toString().padStart(2, '0');
    // console.log(minutes.toString(),seconds.toString(),milliseconds.toString())
  }

  stopPlay.addEventListener("click", () => {
    if (!stopInterval) {
      let startTime = Date.now() - time;
      stopInterval = setInterval(() => {
        time = Date.now() - startTime;
        // updateTimeDisplay();
      }, 10);
      let updateTimeInterval = setInterval(updateTimeDisplay, 70);
      stopInterval = [stopInterval, updateTimeInterval];
      // Hide Play, Show Pause & Reset
      stopPlay.style.display = "none";
      stopPause.style.display = "flex";
      stopReset.style.display = "flex";
      stopReset.disabled = true;
    }

  });

  stopPause.addEventListener("click", () => {
    if (stopInterval) {
      clearInterval(stopInterval[0]);
      clearInterval(stopInterval[1]);
      stopInterval = null;
    }
    stopPlay.style.display = "flex";
    stopPause.style.display = "none";
    stopReset.disabled = false;
  });

  stopReset.addEventListener("click", () => {
    if (!stopInterval) {
      time = 0;
      updateTimeDisplay();
      stopReset.style.display = "none";
      stopPause.style.display = "none";
      stopPlay.style.display = "flex";
    }
  })
}
function convertTo24HourFormat(hour, ampm) {
  let hour24 = parseInt(hour);
  if (ampm === "pm" && hour24 < 12) {
    hour24 += 12; // Convert PM times to 24-hour format
  } else if (ampm === "am" && hour24 === 12) {
    hour24 = 0; // Convert 12 AM to 00 in 24-hour format
  }
  return hour24;
}
window.onload = display_clock;

clock_btn.addEventListener('click', display_clock);
alarm_btn.addEventListener('click', display_alarm);
stopwatch_btn.addEventListener('click', display_stopwatch);
timer_btn.addEventListener('click', display_timer);
