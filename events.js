class Event {
    constructor(name, date, time, rspv=false) {
        this.name = name;
        this.date = date;
        this.time = time;
        this.rsvp = rspv;
        this.print();
    }

    print() {
        console.log(this.name, this.date, this.time, this.location);
    }
}

class EventList {
    constructor() {
        this.list = [];
    }
    addEvent(event) {
        this.list.push(event);
    }
}

const events = new EventList();

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
}