function loadTotalRSVPs() {
    const storedRSVPs = localStorage.getItem('totalRSVPs');
    let totalRSVPs = storedRSVPs ? JSON.parse(storedRSVPs) : 0; 

    const totalSlot = document.getElementById('total-rsvps');
    totalSlot.innerText = `The total number of RSVPs we have gotten from our users is ${totalRSVPs}`;
}