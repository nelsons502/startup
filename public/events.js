//const { cursorTo } = require("readline");

class Event {
    constructor(name, date, time, rspv=false) {
        this.name = name;
        this.date = date;
        this.time = time;
        this.rsvp = rspv;
        this.rsvpCount = 0;
        this.print();
    }

    print() {
        console.log(this.name, this.date, this.time, this.rsvpCount);
    }
}

class EventList {
    constructor() {
      // Initialize the list as an empty array
      this.list = [];
  
      // Load events asynchronously
      this.loadEvents()
        .then(() => {
          // Sort events after loading
          this.sortEvents();
          // Do any other initialization if needed
        })
        .catch(error => {
          console.error('Error initializing events:', error);
        });
    }
  
    async loadEvents() {
      try {
        const response = await fetch('/api/events');
        const responseEvents = await response.json(); // TODO problem is HEREish!!!!
        this.list = responseEvents ?? [];
        localStorage.setItem('events', JSON.stringify(this.list));
      } catch (error) {
        console.error('Error loading events:', error);
        const eventsText = localStorage.getItem('events');
        if (eventsText) {
          this.list = JSON.parse(eventsText);
        }
      }
    }
  
    sortEvents() {
      // Sort the events
      this.list.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
      });
    }  
      

    addEvent(event) {
        this.list.push(event);
        // Update local storage when adding a new event
        this.saveToLocalStorage();
    }

    clearAllEvents() { // only to be used by admin
        this.list = [];
        this.saveToLocalStorage();
    }

    removeEvent(eventToRemove) {
        this.list = this.list.filter(event => event !== eventToRemove);
        this.saveToLocalStorage();
      }      

    // Function to save events to local storage
    saveToLocalStorage() {
        localStorage.setItem('events', JSON.stringify(this.list));
    }
}


const events = new EventList();
//events.clearAllEvents();

function createNewEvent() {
    // Get input values
    var eventName = document.getElementById('event-name').value;
    var eventDate = document.getElementById('event-date').value;
    var eventTime = document.getElementById('event-time').value;
    var eventRSVP = document.getElementById('event-rsvp').checked;

    // Create an event object
    const newEvent = new Event(eventName, eventDate, eventTime, eventRSVP);

    // You can now do something with the newEvent object, like storing it in an array or sending it to a server.
    events.addEvent(newEvent);
    window.location.href = "events.html";

}

// Function to dynamically populate the events list
function populateEventsList() {
    const eventsListElement = document.getElementById('events-list');

    // Clear existing list items
    eventsListElement.textContent = '';

    // Iterate over the events array and add each event to the list
    events.list.forEach(event => {
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
        rsvpCheckbox.addEventListener('change', function() {
            const storedRSVPs = localStorage.getItem('totalRSVPs');
            let totalRSVPs = storedRSVPs ? JSON.parse(storedRSVPs) : 0; 
            // Update the RSVP count based on checkbox state
            event.rsvpCount += this.checked ? 1 : -1;
            totalRSVPs += this.checked ? 1 : -1;
            localStorage.setItem('totalRSVPs', JSON.stringify(totalRSVPs));
            // Display the updated count
            rsvpLabel.textContent = `RSVP: ${event.rsvpCount}`;
        });

        dateAndTimeDiv.appendChild(rsvpLabel);
        dateAndTimeDiv.appendChild(rsvpCheckbox);

        // add date and time div element to list item
        listItem.appendChild(dateAndTimeDiv);

        eventsListElement.appendChild(listItem);
    });
}