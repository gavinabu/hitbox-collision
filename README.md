# Hitbox Collision
 A package that can do 2D and 3D hitbox collision. Currently only 2D works but 3D is comming soon
## Documentation
### Installation

`$ npm install hitbox-collision`

### Getting started

```javascript
const {Hitbox2D, doTheseColide2D} = require("hitbox-collision")

var player = new Hitbox2D(0,0,45,[
  {
    x:-0.8,
    y:-0.5,
    h:1,
    w:1,
    origin:[0,0],
    r:0
  }
])

var box = new Hitbox2D(0,0,0,[
  {
    x:0,
    y:0,
    h:5,
    w:5,
    origin:[0,0],
    r:0
  }
  // Add more hitboxs here
])

console.log(doTheseColide2D(player,box)) // true
```

From this you can expand and add as many boxes as you can.