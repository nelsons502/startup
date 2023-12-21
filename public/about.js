function getJoke(data) {
  fetch('https://official-joke-api.appspot.com/jokes/random')
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#joke');

      const setupEl = document.createElement('p');
      setupEl.classList.add('setup');
      setupEl.textContent = data.setup;

      const punchLineEl = document.createElement('p');
      punchLineEl.classList.add('punchline');
      punchLineEl.textContent = data.punchline;

      containerEl.appendChild(setupEl);
      containerEl.appendChild(punchLineEl);
    });
}

function loadTotalRSVPs() {
  console.log('about to get the totalRSVPs');
  const storedRSVPs = localStorage.getItem('totalRSVPs');
  let totalRSVPs = storedRSVPs ? JSON.parse(storedRSVPs) : 0; 

  const totalSpan = document.getElementById('rsvps');
  totalSpan.innerText = totalRSVPs;
}

getJoke();
//loadTotalRSVPs();

console.log('in about.js');