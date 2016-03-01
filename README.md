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

document.getElementById('download').addEventListener('click', function(){
    window.open(picasso.getAsImage().src, '_blank');
});
document.getElementById('clear').addEventListener('click', function(){
    picasso.clear();
});
document.getElementById('brushColor').addEventListener('change', function(e){
    picasso.brush.color = e.target.value;
});
document.getElementById('size').addEventListener('change', function(e){
    picasso.brush.size = e.target.value;
});
```