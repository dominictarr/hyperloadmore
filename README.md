# hyperloadmore

a simple paginator

The main goal here is to come up with an interface that could
be supported by both an infinite scroller, or a "load more" button.
some interfaces also like to have a "load more" at the top,
but an infinite scroll at the bottom.

The interface used here is CustomEvents, first `hyperloadmore`
is created with a content object. The user emits "hasmore" messages
on the content element when there are new elements ready to display.
this updates the button to show the user it's waiting.
When the user clicks the button, the `hyperloadmore` emits
a `readymore` event - this tells content to add more elements
to that end... The content is responsible for
deciding how many to add, and if/when there are more to come,
to emit another "hasmore" event.

`hasmore` events have a `.detail.top` and `.detail.bottom` boolean
properties to indicate whether the new content is to be added
at the start or end. ("detail" is a feature of [CustomEvents api](https://davidwalsh.name/customevent))

## example



``` js
var HyperLoadMore = require('hyperloadmore')

var h = require('hyperscript')

var content = h('content')

content.addEventListener('readymore', function (ev) {
  if(ev.detail.bottom) {
    for(var i = 0; i < 10; i++)
      content.appendChild(createElement(...))
  }
})

document.body.appendChild(HyperLoadMore(content))

content.dispatchEvent(
new CustomEvent('hasmore', {target: content, detail: {bottom: true, count: 10}})
)
```

## events

### readymore

`event.target` is the element to be added to.
`event.detail.top` is true if elements should be added to the top.
`event.detail.bottom` is true if elements should be added to the bottom

### hasmore

when you have new data ready to display, emit the `hasmore` event.
``` js
content.dispatchEvent(new CustomEvent('hasmore', {
  target: content,
  detail: {
    bottom: true, top: false, //bottom should != top
    count: N //optional.
  }
}))

```


## License

MIT






