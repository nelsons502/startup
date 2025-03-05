# startup

A repo for my Date Roulette website.

## Elevator Pitch
Ever have trouble coming up with a good plan for a date? Whether going on a first date or the 100th, it can be difficult to decide what to do for food, for an activity, or even which movie to pick. Your Date Roulette can help you decide what to do in just minutes! You can make custom spinners with ideas for what to do. You can save these ideas and come back to them later, improving spinners over time as you try out different ideas.

## Diagrams
This diagram is of my old design...
![Image of website design](startup-design.png)

## More detailed description
The Dating Roulette site will let users create accounts and save their date ideas to their profile. They can then form "spinners" out of those ideas which make random selection very easy. While there is a limited number of spinners one can make, the number of ideas one can have saved on their account has no prescribed limit. In addition to having their own ideas and spinners, there will be a feed of ideas that other users have submitted to the public "pool" of date ideas. Users can grad those ideas and add them to their own date idea "library."

## Technologies I will use:
... needs updating ...
- **HTML** - Uses correct HTML structure for application. Four HTML pages. One for login, one for displaying spinners and idea library, one for viewing ideas in the communal "pot", and one for viewing and spinning one of your own spinners.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast. Little animations on the login and quote pages to make them more visually appealing.
- **React** - Provides login, previous chat display, handles API requests and responses to ChatGPT, display posts of others' projects, backend endpoint calls. Single page application with views componentized and reactive to user's actions.
- **Service** - Backend service with endpoints for:
  - logging in with username and password
  - retrieving old chats (based on user)
  - saving current chat
  - retrieving posts
  - adding new posts
  - displayed a random quote using the https://programming-quotes-api.azurewebsites.net/api/quotes/random API
- **DB/Login** - Store users, chats, and posts in database. Register and login users. Credentials securely stored in database. Can't chat with bot or view posts unless authenticated.
- **WebSocket** - As soon as a new project is posted, all users can see the post get added to the feed.