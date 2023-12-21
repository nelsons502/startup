function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
  
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
}

function loadTotalRSVPs() {
    const storedRSVPs = localStorage.getItem('totalRSVPs');
    let totalRSVPs = storedRSVPs ? JSON.parse(storedRSVPs) : 0; 

    const totalSlot = document.getElementById('total-rsvps');
    totalSlot.innerText = `The total number of RSVPs we have gotten from our users is ${totalRSVPs}`;
}

displayQuote();
loadTotalRSVPs();