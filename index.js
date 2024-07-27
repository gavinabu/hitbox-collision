class Hitbox2D {
  x;
  y;
  rot;
  boxes;
  constructor(x=0,y=0,rot=0,boxes=[]) {
    this.x=x
    this.y=y
    this.boxes = boxes
    this.rot= rot
  }
  setX(x) {
    this.x=x
  }
  getX() {
    return this.x
  }
  setY(y) {
    this.y=y
  }
  getY() {
    return this.y
  }
  getRot() {
    return this.rot
  }
  setRot(rot) {
    this.rot = rot
  }
  convertToPoints() {
    return this.boxes.map(e => {
      return rotate(e.x+this.x,e.y+this.y,e.w,e.h,e.r+this.rot,e.origin)
    })
  }
  getBoxes() {
    return this.boxes
  }
}
function properRound(num) {
  if(num % 1 < 0.5) {
    return Math.floor(num)
  }
  return Math.ceil(num)
}
const rotatePointAroundOrigin = (point,origin,angle) => {
  var rad = angle * (Math.PI / 180);
  var x = point[0] - origin[0];
  var y = point[1] - origin[1];
  var rotatedX = x * Math.cos(rad) - y * Math.sin(rad);
  var rotatedY = x * Math.sin(rad) + y * Math.cos(rad);
  return [properRound((rotatedX + origin[0]) * 100000) / 100000, properRound((rotatedY + origin[1]) * 100000) / 100000];
}
function rotate(x,y,w,h,r,origin) {
  var topleft = [x,y]
  var topright = [x+w,y]
  var bottomleft = [x,y+h]
  var bottomright = [x+w,y+h]
  return {
    topleft: rotatePointAroundOrigin(topleft,origin,r),
    topright: rotatePointAroundOrigin(topright,origin,r),
    bottomleft: rotatePointAroundOrigin(bottomleft,origin,r),
    bottomright: rotatePointAroundOrigin(bottomright,origin,r)
  }
}
function are2DPolygonsColliding(polygon1, polygon2) {
  const polygons = [polygon1, polygon2];
  const axes = getAxes(polygon1).concat(getAxes(polygon2));

  for (let axis of axes) {
      const projection1 = projectPolygon(polygon1, axis);
      const projection2 = projectPolygon(polygon2, axis);

      if (!overlapping(projection1, projection2)) {
          return false;
      }
  }
  return true;
}

function getAxes(polygon) {
  const axes = [];
  for (let i = 0; i < polygon.length; i++) {
      const p1 = polygon[i];
      const p2 = polygon[(i + 1) % polygon.length];
      const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
      axes.push({ x: -edge.y, y: edge.x });
  }
  return axes;
}

function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function projectPolygon(polygon, axis) {
  const dots = polygon.map(point => dotProduct(point, axis));
  return { min: Math.min(...dots), max: Math.max(...dots) };
}

function overlapping(projection1, projection2) {
  return !(projection1.max < projection2.min || projection2.max < projection1.min);
}

function doTheseColide2D(hitbox1,hitbox2) {
  // var st = performance.now()
  var d1 = hitbox1.convertToPoints()
  var d2 = hitbox2.convertToPoints()
  var colide = false
  d1.forEach(e1 => {
    d2.forEach(e2 => {
      if(are2DPolygonsColliding([{x:e1.topleft[0],y:e1.topleft[1]},{x:e1.topright[0],y:e1.topright[1]},{x:e1.bottomright[0],y:e1.bottomright[1]},{x:e1.bottomleft[0],y:e1.bottomleft[1]}],[{x:e2.topleft[0],y:e2.topleft[1]},{x:e2.topright[0],y:e2.topright[1]},{x:e2.bottomright[0],y:e2.bottomright[1]},{x:e2.bottomleft[0],y:e2.bottomleft[1]}])) {
        colide = true
      }
    })
  })
  // console.log(`Data in ${properRound((performance.now() - st) * 100000)/100000}ms`)
  return colide
}
module.exports = {
  doTheseColide2D,
  are2DPolygonsColliding,
  Hitbox2D
}