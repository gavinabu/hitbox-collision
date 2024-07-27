type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type BoxT = {
  x:number,
  y:number,
  h:number,
  w:number,
  origin:[0,0],
  r:IntRange<0,360>
}
export class Hitbox2D {
  private x;
  private y;
  private rot;
  private boxes;
  constructor(x:number,y:number,rot:number,boxes:BoxT[])
  setX(x)
  getX():number
  setY(y)
  getY():number
  getRot():number
  setRot(rot)
  getBoxes():BoxT[]
}

export function doTheseColide2D(hitbox1:Hitbox2D,hitbox2:Hitbox2D): boolean
type Poly2D = {x:number,y:number}[]
export function are2DPolygonsColliding(polygon1:Poly2D[],polygon2:Poly2D[])