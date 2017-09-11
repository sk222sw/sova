var html = require('choo/html')

var login = require('./login')

var TITLE = '🚂🚋🚋'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  
  console.log("main state", state)
  
  return html`
    <body class="sans-serif">
      <h1 class="f-headline pa3 pa4-ns">
        'ello!
      </h1>
      ${state.user 
        ? html`<button onclick=${() => emit('startLogout')}>logout</button>`
        : login(state, emit)}
    </body>
  `
}

