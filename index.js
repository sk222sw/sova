var css = require('sheetify')
var choo = require('choo')

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

css('tachyons')

var app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
}

app.use(require('choo-service-worker')())

var config = {
    apiKey: "AIzaSyCST9bJy_R0I4ierzA7Tx3cUrcpDRFXRnI",
    authDomain: "sova-71934.firebaseapp.com",
    databaseURL: "https://sova-71934.firebaseio.com",
    projectId: "sova-71934",
    storageBucket: "sova-71934.appspot.com",
    messagingSenderId: "936295950893"
};
firebase.initializeApp(config);

var provider = new firebase.auth.FacebookAuthProvider()

app.use((state, emitter) => {
  state.user = null
  
  // crashes on npm run after something else crashed:
  //
  // firebase.auth().onAuthStateChanged(user => {
  //   console.log("auth state changed", user)
  //   if (user) {
  //     state.user = user
  //     console.log("state: ", state)
  //   } else {
  //     state.user = null
  //   }
  //   emitter.emit('render')
  // })
  
  emitter.on('startLogout', () => {
    firebase.auth().signOut()
      .then(result => {
        state.user = null
        emitter.emit('render')
      })
      .catch(console.log)
  })
  
  emitter.on('startLogin', () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        state.user = res.user
        emitter.emit('render')
      })
  })
  
})

app.route('/', require('./views/main'))
app.route('/login', require('./views/login'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app