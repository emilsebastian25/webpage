const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
populateUI();

let ticketPrice = +movieSelect.value;

function updateSeatCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  console.log(seatsIndex);
  localStorage.setItem('indexOfSeats', JSON.stringify(seatsIndex));
  const selectedSeatCount = selectedSeats.length;
  console.log(selectedSeatCount);
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('indexOfSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('indexOfMovie');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('indexOfMovie', movieIndex);
  localStorage.setItem('priceOfMovie', moviePrice);
}

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSeatCount();
});
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }
  updateSeatCount();
});

updateSeatCount();
