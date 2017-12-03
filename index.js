var h = require('hyperscript')

module.exports = function (content, onMore) {
  var bottom, top

  function onMore (ev) {
    if(ev.target == bottom) {
      bottom.disabled = true
      bottom.textContent = 'loading...'
      content.dispatchEvent(new CustomEvent(
        'readymore', {target: content, detail: {bottom: true}}
      ))
    }
    else if(ev.target == top) {
      top.disabled = true
      top.textContent = 'loading...'
      content.dispatchEvent(new CustomEvent(
        'readymore', {target: content, detail: {top: true}}
      ))
    }
  }

  function text (count) {
    return 'load more' + (count ? ' ('+count+')' : '')
  }

  function createButton (text, onClick) {
    return h('button', {onclick: onClick}, text)
  }

  content.addEventListener('hasmore', function (ev) {
    if(ev.detail.bottom) {
      if(bottom) {
        bottom.textContent = text(ev.detail.count)
        bottom.disabled = false
      }
      else
        scroller.appendChild(bottom = createButton(text(ev.count), onMore))
    }
    else if(ev.detail.top) {
      if(top) {
        top.textContent = text(ev.detail.count)
        top.disabled = false
      }
      else {
        scroller.insertBefore(top = createButton(text(ev.count), onMore), content)
      }
    }
  })

  var scroller = h('div.hyperloadmore__scroller', content)

  return scroller
}

