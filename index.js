const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// predefine events...
let events = [];

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/events', (_req, res) => {
  res.send(events);
});

/*
// GetScores
apiRouter.get('/events', (_req, res) => {
  const eventSubset = events.map(event => ({ name: event.name, date: event.date, time: event.time, rsvpCount: event.rsvpCount }));
  res.send(eventSubset);
});
*/

// SubmitScore
apiRouter.post('/event', (req, res) => {
  events = updateEvents(req.body, events);
  res.send(events);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


function updateEvents(newEvent, events) {
  let found = false;
  for (const [i, prevEvent] of events.entries()) {
    if (newEvent.name === prevEvent.name) {
      found = true;
      break;
    }
  }

  if (!found) {
    events.push(newEvent);
  }
  else {
    console.log('it looks like that event already exists');
  }

  return events;
}