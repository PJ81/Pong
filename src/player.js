import Rect from "./rect.js"

export default class Player extends Rect {
  constructor(w, h) {
    super(w, h);
    this.score = 0;
  }
}