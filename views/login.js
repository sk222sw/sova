var html = require('choo/html')

module.exports = view

function view (state, emit) {
  return html`
    <div>
        Login
          <button onclick=${() => emit('startLogin')}>Login</button>
    </div>
  `
}

