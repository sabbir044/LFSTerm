var os = require('os')
var pty = require('node-pty')
var Terminal = require('xterm').Terminal
var { FitAddon } = require('xterm-addon-fit')

// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL']
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cwd: process.env.HOME,
  env: process.env
})

// Initialize xterm.js and attach it to the DOM
const xterm = new Terminal()
const fit = new FitAddon()
xterm.loadAddon(fit)
xterm.open(document.getElementById('xterm'))
fit.fit()
// Setup communication between xterm.js and node-pty
xterm.onData(data => ptyProcess.write(data))
ptyProcess.onData(function (data) {
  xterm.write(data)
})

window.addEventListener("resize", function () {
  console.log("hello")
  fit.fit()
});

Prism.plugins.toolbar.registerButton('hello-world', {
  text: 'Run in Terminal', // required
  onClick: function (env) { // optional
    console.log("code: "+env.code)
    let code = env.code + "\n"
    //xterm.write(env.code)
    ptyProcess.write(code)
  }
});


