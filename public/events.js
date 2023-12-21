async function loadEvents() {
    let events = [];

    try {
        // Get the current list of events from the service
        const response = await fetch('/api/events');
        events = await response.json();

        // Save the events in case we go offline in the future
        localStorage.setItem('events', JSON.stringify(events));
    } catch {
        // If there was an error then just use the last saved events
        const eventsText = localStorage.getItem('events');
        if (eventsText) {
            events = JSON.parse(eventsText);
        }
    }
    sortEvents(events);
    populateEventsList(events);

}

function sortEvents(events) {
    // Sort the events
    events.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });
}

// Function to dynamically populate the events list
function populateEventsList(events) {
    const eventsListElement = document.getElementById('events-list');

    // Clear existing list items
    eventsListElement.textContent = '';

    // Iterate over the events array and add each event to the list
    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.className = 'event';

        // Format the date and time
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        const eventTime = new Date(`1970-01-01T${event.time}`);
        const formattedTime = eventTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        // Create individual div elements for name, date, and time
        const nameDiv = document.createElement('div');
        nameDiv.textContent = event.name;
        nameDiv.className = 'event-name';
        listItem.appendChild(nameDiv);

        // Make the date and time div element
        const dateAndTimeDiv = document.createElement('div');
        dateAndTimeDiv.className = 'event-date-and-time';

        // make date div element
        const dateDiv = document.createElement('div');
        dateDiv.textContent = formattedDate;
        dateDiv.className = 'event-date';
        dateAndTimeDiv.appendChild(dateDiv);

        //make time div element
        const timeDiv = document.createElement('div');
        timeDiv.textContent = formattedTime;
        timeDiv.className = 'event-time';
        dateAndTimeDiv.appendChild(timeDiv);

        // make a button for attending the session
        const rsvpCheckbox = document.createElement('input');
        rsvpCheckbox.className = 'rsvp-checkbox';
        rsvpCheckbox.type = 'checkbox';
        rsvpCheckbox.checked = false;
        rsvpCheckbox.disabled = !event.rsvp; // Disable the checkbox for display purposes
    
        const rsvpLabel = document.createElement('label');
        rsvpLabel.className = 'rsvp-label';
        rsvpLabel.textContent = `RSVP: ${event.rsvpCount}`;
        rsvpCheckbox.addEventListener('change', checkForRSVP(event, rsvpLabel));

        dateAndTimeDiv.appendChild(rsvpLabel);
        dateAndTimeDiv.appendChild(rsvpCheckbox);

        // add date and time div element to list item
        listItem.appendChild(dateAndTimeDiv);

        eventsListElement.appendChild(listItem);
    });
}

function checkForRSVP(event, rsvpLabel) {
    let storedRSVPs = localStorage.getItem('totalRSVPs');
    let totalRSVPs = storedRSVPs ? JSON.parse(storedRSVPs) : 0; 
    // Update the RSVP count based on checkbox state
    event.rsvpCount += this.checked ? 1 : -1;
    totalRSVPs += this.checked ? 1 : -1;
    localStorage.setItem('totalRSVPs', JSON.stringify(totalRSVPs));
    // Display the updated count
    rsvpLabel.textContent = `RSVP: ${event.rsvpCount}`;
}

loadEvents();