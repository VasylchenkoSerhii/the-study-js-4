import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
 
const refs = {
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    mins: document.querySelector('[data-minutes]'),
    secs: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', start);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate
            || selectedDates[0] === options.defaultDate) {
            alert("Please choose a date in the future")
            return;
        }; 

        refs.startBtn.removeAttribute('disabled');

        localStorage.setItem('date', selectedDates[0]);
        
  },
};

flatpickr("#datetime-picker", options);

function start() {
    const date = new Date(localStorage.getItem('date'));
    refs.startBtn.setAttribute("disabled", "disabled");
        setInterval(() => {
            const toDay = new Date();
            const delta = date - toDay;
            const res = convertMs(delta);
            updateTimer(res);
        }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function updateTimer(obj) {
    const {
        days,
        hours,
        minutes,
        seconds
    } = obj;
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = minutes;
    refs.secs.textContent = seconds;
};

