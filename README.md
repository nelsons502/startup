# startup
A repo for my startup, Focused Coding
BYU course instruction found here: https://github.com/webprogramming260/.github/blob/main/profile/instructionTopics.md

## Elevator Pitch
Meet the ***Focused Coding*** online community interface! This fun, interactive website has a chatbot designed to guide young Computer Science students through challenging concepts and projects. With a clean chat interface and easy access to recent conversations for review, the bot uses natural language to clarify tough topics, provide constructive feedback on code, and offer abstract examples - all without doing the work in the student's place! Features include inspirational programming quotes refreshed via API, a project showcase to celebrate peer achievements, and a secure login for a personalized experience. It’s an application for fostering **creativity**, **community**, and **focus**!

## Diagrams
![Image of website design](images/startup-design.png)

## More detailed description

This will be a fun, AI chatbot meant to interact with young Computer Science students. The chat feature will have a main portion with the current chat, as well as the most recent chats available to click on at the side of the screen. These old chats will be for examination only, not meant to continue the conversation with the bot.

The chatbot will be prompted to respond to questions the student has about CS, helping him/her understand any topics that may be confusing, or that he/she needs more practice with.

The bot will avoid giving a student code to complete his/her projects, opting to instead use natural language to guide the student's programming, reviewing and giving comments on code the student has written, and, in cases where these strategies are not enough, providing abstract code examples of the topic in question.

The purpose of this bot is to help provide young CS students with 24-7 access to a "tutor" who can help them with homework and/or personal projects. The bot will challenge students to apply their budding skills by answering questions and guiding without doing any of the work for the student.

The application will also include other features, such as:

- A programming related inspirational quote. The page will have a refresh button to get a new quote. This will be an API call.

- A page where approved projects from fellow students are posted and available for each student to check-out. This will build a sense of community as students are able to see the work their peers are completing. Students will be able to download the code from these projects, as well as "like" the post.

- A login screen.


## Technologies I will use:
- **HTML** - Uses correct HTML structure for application. Four HTML pages. One for login, one for chatting with the bot, one for viewing recent posts of students' projects, and one for viewing a programming-related inspirational quote.
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