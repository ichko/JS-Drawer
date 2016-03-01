var drawer = (function(){
    
    function brush(config){
        this.color = config.color || '#ff0000';
        this.size = config.size || 5;
    }
    
    function drawer(config){
        this.brush = config.brush || new brush({});
        this.canvas = config.canvas || document.createElement('canvas');
        
        this.width = config.width || this.canvas.width;
        this.height = config.height || this.canvas.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.ctx = this.canvas.getContext("2d");
        this.enabled = config.enabled === 'undefined' ? false : true;
        
        this.inputHandler = config.inputHandler;
        this.inputHandler.bindEvents(this.canvas);
        
        var me = this;
        this.canvas.addEventListener('mousemove', function(){ mouseMoved.call(me); });
        this.canvas.addEventListener('mousedown', function(){ mouseMoved.call(me); });
    }
    
    function mouseMoved(){
        if(this.enabled && this.inputHandler.mouse.leftKeyDown)
            draw(this.ctx, this.inputHandler.mouse, this.brush);
    }
    
    function draw(ctx, mouse, brush){
        ctx.beginPath();
            ctx.strokeStyle = brush.color;
            ctx.lineWidth = brush.size;
            ctx.moveTo(mouse.oldX, mouse.oldY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
            ctx.fillStyle = brush.color;
            ctx.arc(mouse.x, mouse.y, brush.size / 2, 0, 2 * Math.PI);
            ctx.fill();
        ctx.closePath();
    }
    
    function getAsImage(){
        var image = new Image();
        image.src = this.canvas.toDataURL();
        
        return image;
    }
    
    function clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    drawer.prototype = {
        clear: clear,
        getAsImage: getAsImage
    };
    
    return {
        init: function(config){
            return new drawer(config || {});
        }
    };
    
})();