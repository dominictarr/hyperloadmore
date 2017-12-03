var ReadQueue = require('pull-read-queue')

function stream (content, isTop) {
  var queue = ReadQueue(5, 20, function (data) {
    content.dispatchEvent(new CustomEvent('hasmore', {target: content, detail: {
      bottom: !isTop, top: !!isTop, count: queue.getLength()
    }}))
  })

  content.addEventListener('readymore', function (ev) {
    var l = Math.min(queue.getLength(), 10)
    var first
    for(var i = 0; i < l; i++) {
      var el = queue.shift()
      if(!first) first = el
      if(!isTop)
        content.appendChild(el)
      else {
        if(content.firstChild)
          content.insertBefore(el, content.firstChild)
        else
          content.appendChild(el)
      }
    }
    if(queue.getLength() > 0)
      content.dispatchEvent(new CustomEvent('hasmore', {target: content, detail: {
        bottom: !isTop, top: !!isTop, count: queue.getLength()
      }}))
  })

  return queue
}

exports.top = function (content, isTop) {
  return stream(content, true)
}

exports.bottom = function (content) {
  return stream(content, false)
}

