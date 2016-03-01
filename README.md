#JS Drawer

##Example
```javascript
var drawer = drawer || {};
var inputHandler = inputHandler || {};

var picasso = drawer.init({
    canvas: document.getElementById('canvas'), 
    inputHandler: inputHandler,
    width: window.innerWidth,
    height: window.innerHeight
});

picasso.brush.color = '#2c5c8d';
picasso.brush.size = 10;
```