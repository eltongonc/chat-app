# Chat app
The Chat app is a web-application that lets users chat with random visitors.

## How does it work
When a user visits the website, the will be asked to enter a username. After entering a username, the user can view who is online and start chatting with them

### Built With
- Node.js with an Express.js framework - Server.
- Socket.io - Realtime client - sever communication.
- Handlebars - Serverside templating.
- JavaScript (mixed ES5 and ES6) - Client.
- CSS for the styling.

## How to contribute
You can help improve this project by sharing your expertise and tips. Contributions of all kinds are welcome: reporting issues, updating documentation, fixing bugs, building examples, sharing projects, and any other tips that may improve my code.

### Install
- First clone this repo with:
```txt
$ git clone https://github.com/eltongonc/real-time_web.git
```

- then run:
```
$ npm install && npm start
```
this should start the app in your localhost.

**Live**

- To view it live on other devices run:
```
$ npm install && npm start
```
- keep this terminal open an open another one, and run:
```
$ npm run ngrok
```
this should give you a http link.

## To-do
- [x] Express server
- [x] Implement socket.io
- [x] App is live
- [x] Read and send messages
- [x] Identify an user
- [x] Make the site response to work on smaller devices
- [ ] Production ready code on github

## Wishlist
- [ ] Username and password stored in database
- [ ] Messages stored in database for backtrack

## Features
- You can chat with other people
- User can provide a temporary username
- The chat checks if the username is already use (doesn't give the user feedback)
- The chat shows when a message is submitted
- The chat keeps track of the users active in the chat
- The gives the user a profile image (not changeable yet)

## Example
Here is a link to the [chat app](http://real-time-web.herokuapp.com/)

## Sources
- Style use: [Codepen](http://codepen.io/Momciloo/pen/bEdbxY?editors=1100)
- Socket.io tutorial: [youtube](https://www.youtube.com/watch?v=tHbCkikFfDE&t=10s)
- Piece of code from [Timo Verkroost's github](https://github.com/TimoVerkroost/minor-real-time-web/blob/master/public/javascripts/main.js#L33)

### Author
`Elton Gonçalves Gomes` - checkout more of my work on [github](github.com/eltongonc)

## Licensing
MIT Elton Goncalves Gomes
