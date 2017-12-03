
var h = require('hyperscript')
var content = h('ul')

content.addEventListener('readymore', function (ev) {
  setTimeout(function () {
    function add (el) {
      if(ev.detail.bottom || !content.firstChild)
        content.appendChild(el)
      else if(ev.detail.top) {
        content.insertBefore(el, content.firstChild)
      }
    }

    var last
    for(var i = 0; i < 10; i++)
      add(last = h('li', ''+Math.round(Math.random() * content.children.length)))

    last.scrollIntoViewIfNeeded()

    //more from the same end...
    content.dispatchEvent(new CustomEvent('hasmore', {
      target: content, detail: {bottom: ev.detail.bottom, top: ev.detail.top, count: 10}
    }))

  }, 1000*Math.random())
})

document.body.appendChild(
  require('./')(content)
)

content.dispatchEvent(new CustomEvent('hasmore', {
  target: content, detail: {top: true, count: 10}
}))
content.dispatchEvent(new CustomEvent('hasmore', {
  target: content, detail: {bottom: true, count: 10}
}))










