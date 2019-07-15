import Vec2 from "./vec.js"

export default class Rect {
  constructor(w = 0, h = 0) {
    this.pos = new Vec2();
    this.size = new Vec2(w, h);
  }

  left() {
    return this.pos.x - (this.size.x >> 1);
  }

  right() {
    return this.pos.x + (this.size.x >> 1);
  }

  top() {
    return this.pos.y - (this.size.y >> 1);
  }

  bottom() {
    return this.pos.y + (this.size.y >> 1);
  }

  draw(ctx) {
    ctx.fillRect(this.left(), this.top(), this.size.x, this.size.y);
  }
}