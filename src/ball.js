import Rect from "./rect.js"
import Vec2 from "./vec.js"
import * as Const from "./const.js"

export default class Ball extends Rect {
  constructor(w, h) {
    super(w, h);
    this.dir = new Vec2();
  }

  update(dt) {
    this.pos.x += this.dir.x * dt;
    this.pos.y += this.dir.y * dt;

    let r = 0;

    if (this.left() < 0 || this.right() > Const.WIDTH) {
      r = this.dir.x < 0 ? -1 : 1;
    }
    if (this.top() < 0 || this.bottom() > Const.HEIGHT) {
      this.dir.y = -this.dir.y;
    }
    return r;
  }

  start() {
    this.dir.x = 300 * (Math.random() > .5 ? 1 : -1);
    this.dir.y = 300 * (Math.random() * 2 - 1);
    this.dir.len = 250;
  }
}