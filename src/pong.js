import Ball from "./ball.js"
import Player from "./player.js"
import Numbers from "./numbers.js"
import * as Const from "./const.js"

class Pong {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "#fff";

    this.numbers = new Numbers();
    this.players = [
      new Player(20, 120),
      new Player(20, 120)
    ];
    this.ball = new Ball(16, 16);

    this.state;
    this.winner;
    this.lastTime = 0;
    this.accumulator = 0;
    this.waitTime = 0;

    this.reset();

    this.loop = (now) => {
      this.accumulator += (now - this.lastTime) / 1000;
      while (this.accumulator > Const.STEP) {
        this.update(Const.STEP);
        this.accumulator -= Const.STEP;
      }
      this.draw();
      this.lastTime = now;
      requestAnimationFrame(this.loop);
    }
    this.loop(0)
  }

  reset() {
    this.state = Const.GOAL;
    this.waitTime = .8;
    this.ball.pos.set(Const.WIDTH >> 1, Const.HEIGHT >> 1);
    this.ball.start();
    this.players[0].pos.set(40, Const.HEIGHT >> 1);
    this.players[1].pos.set(Const.WIDTH - 40, Const.HEIGHT >> 1);
  }

  goal(p) {
    this.players[p].score++;
    if (this.players[p].score > 14) {
      this.winner = p;
      this.state = Const.OVER;
    } else {
      this.reset();
    }
  }

  update(dt) {
    switch (this.state) {
      case Const.GOAL:
        if ((this.waitTime -= dt) < 0) {
          this.state = Const.PLAY;
        }
        break;
      case Const.PLAY:
        const r = this.ball.update(dt);
        if (r !== 0) {
          this.goal(r < 0 ? 1 : 0)
        } else {
          this.updateAI();
          this.collide();
        }
        break;
      case Const.OVER:
        this.players.forEach(p => {
          p.score = 0;
        });
        this.reset();
        break;
    }
  }

  collide() {
    const p = this.players[this.ball.dir.x < 0 ? 0 : 1];
    if (!((p.bottom() < this.ball.top()) ||
        (p.top() > this.ball.bottom()) ||
        (p.right() < this.ball.left()) ||
        (p.left() > this.ball.right()))) {
      const l = this.ball.len;
      this.ball.dir.x = -this.ball.dir.x;
      this.ball.dir.y += 300 * (Math.random() - .5);
      this.ball.len = l * 1.05;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, Const.WIDTH, Const.HEIGHT);
    this.ball.draw(this.ctx);
    this.players.forEach((p, idx) => {
      p.draw(this.ctx);
      this.drawScore(p.score.toString(), idx);
    });
  }

  drawScore(scr, idx) {
    const q = idx === 0 ? Const.WIDTH >> 2 : Const.WIDTH - (Const.WIDTH >> 2);
    const hl = scr.length * 60 + (scr.length - 1) * 10;
    let s = q - (hl >> 1);
    scr.split("").forEach(c => {
      this.ctx.drawImage(this.numbers.getNumber(c | 0), s, 20);
      s += 70;
    })
  }

  updateAI() {
    const ai = this.players[1];
    ai.pos.y = this.ball.pos.y;
    if (ai.bottom() > Const.HEIGHT) {
      ai.pos.y = Const.HEIGHT - (ai.size.y >> 1);
    }
    if (ai.top() < 0) {
      ai.pos.y = ai.size.y >> 1;
    }
  }
}

const pong = new Pong(document.getElementById("pong"));
pong.canvas.addEventListener("mousemove", (e) => {
  const s = e.offsetY / e.target.getBoundingClientRect().height;
  const p = pong.players[0];
  p.pos.y = Const.HEIGHT * s;
  if (p.bottom() > Const.HEIGHT) {
    p.pos.y = Const.HEIGHT - (p.size.y >> 1);
  }
  if (p.top() < 0) {
    p.pos.y = p.size.y >> 1;
  }
});