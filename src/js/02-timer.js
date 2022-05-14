import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateStart: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
};
refs.buttonStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      refs.buttonStart.disabled = false;
    }
  },
};

flatpickr(refs.dateStart, options); //to create flatpickr instance
