import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateStart: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('.timer [data-days]'),
  hours: document.querySelector('.timer [data-hours]'),
  minutes: document.querySelector('.timer [data-minutes]'),
  seconds: document.querySelector('.timer [data-seconds]'),
};
let leftTime = 5454254522;
refs.buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  leftTime: 0,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      //window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.buttonStart.disabled = false;
      this.leftTime = selectedDates[0].getTime() - options.defaultDate.getTime();
      console.log(selectedDates[0]);
    }
    return this.leftTime;
  },
};
flatpickr(refs.dateStart, options); //to create flatpickr instance
//-------------------------------------------------------------------
refs.timer.style.display = 'flex';
refs.timer.style.marginTop = '20px';
[...refs.timer.children].map(child => {
  child.style.marginRight = '15px';
  child.firstElementChild.style.display = 'block';
  child.firstElementChild.style.fontSize = '25px';
  child.lastElementChild.style.fontSize = '10px';
  child.lastElementChild.style.textTransform = 'uppercase';
  child.lastElementChild.style.fontWeight = 'bold';
});
//--------------------------------------------------------------------
refs.buttonStart.addEventListener('click', onTimer);
//---------------------------------------------------------------------
function onTimer() {
  setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(leftTime);
    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
  }, 1000);
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
}

function pad(value) {
  return String(value).padStart(2, '0');
}
