var inputHandler = (function(){

    var keyCode = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        SPACE: 32,
        ESC: 27,
        W: 87,
        S: 83,
        A: 65,
        D: 68,
        Q: 81,
        E: 69,
        PLUS: 187,
        MINUS: 189
    },
    mouse = {
        oldX: 0,
        oldY: 0,
        x: 0,
        y: 0,
        dX: 0,
        dY: 0,
        move: false,
        leftKeyDown: false,
        rightKeyDown: false,
        scrollKeyDown: false,
        isMoving: function(){
            var temp = mouse.move;
            mouse.move = false;

            return temp;
        }
    },
    leftMouseKeyCode = 1,
    scrollMouseKeyCode = 2,
    rightMouseKeyCode = 3;

    // Set all keys to false (not pressed)
    var keyState = (function(keyCode){
        var state = {};

        for(var keyName in keyCode)
            state[keyCode[keyName]] = false;

        return state;
    })(keyCode);

    function keyDown(state){
        return keyState[state];
    }

    function bindEvents(element){
        element.addEventListener('keydown', function(e){
            if (keyState[e.keyCode] != undefined)
                keyState[e.keyCode] = true;
        });
        
        element.addEventListener('keyup', function(e){
            if (keyState[e.keyCode] != undefined)
                keyState[e.keyCode] = false;
        });
        
        element.addEventListener('mousemove', function(e){
            mouse.oldX = mouse.x;
            mouse.oldY = mouse.y;
            mouse.x = e.offsetX;
            mouse.y = e.offsetY;
            mouse.dX = e.movementX;
            mouse.dY = e.movementY;
            
            if(mouse.dY > 100)
                mouse.dY = 100;
                
            mouse.move = true;
        });
        
        element.addEventListener('contextmenu', function(e){
            e.preventDefault();
        });
        
        element.addEventListener('mousedown', function(e){
            element.style.cursor = 'default';
            
            if(e.which == leftMouseKeyCode)
                mouse.leftKeyDown = true;
                
            if(e.which == scrollMouseKeyCode)
                mouse.scrollKeyDown = true;
                
            if(e.which == rightMouseKeyCode)
                mouse.rightKeyDown = true;
        });
        
        element.addEventListener('mouseup', function(e){
            element.style.cursor = 'default';
            
            if(e.which == leftMouseKeyCode)
                mouse.leftKeyDown = false;
                
            if(e.which == scrollMouseKeyCode)
                mouse.scrollKeyDown = false;
                
            if(e.which == rightMouseKeyCode)
                mouse.rightKeyDown = false;
        });
    }

    function lockPointer(element, event){
        element = element || document.body;
        
        element.addEventListener(event || 'dblclick', function(){
            element.requestPointerLock = element.requestPointerLock ||
            element.mozRequestPointerLock ||
            element.webkitRequestPointerLock;
            element.requestPointerLock();
        });
    }
    
    function lockPointerLost(element){
        return document.pointerLockElement === element ||
               document.mozPointerLockElement === element ||
               document.webkitPointerLockElement === element;
    }

    return {
        keyDown: keyDown,
        key: keyCode,
        mouse: mouse,
        lockPointer: lockPointer,
        lockPointerLost: lockPointerLost,
        bindEvents: bindEvents
    };

})();