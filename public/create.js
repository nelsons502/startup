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

function createNewEvent() {
    // Get input values
    var eventName = document.getElementById('event-name').value;
    var eventDate = document.getElementById('event-date').value;
    var eventTime = document.getElementById('event-time').value;
    var eventRSVP = document.getElementById('event-rsvp').checked;

    // Create an event object
    const newEvent = new Event(eventName, eventDate, eventTime, eventRSVP);

    // You can now do something with the newEvent object, like storing it in an array or sending it to a server.
    addEvent(newEvent);
}

async function addEvent(event) {
    // have the api update its own events list
    fetch(`/api/event`,{
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log('Event addded to front-end list' + jsonResponse.stringify());
    });
}