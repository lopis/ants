

import { init, Sprite, GameLoop, degToRad } from 'kontra';

let { canvas } = init();

canvas.height = innerHeight
canvas.width = innerWidth

let sprite = Sprite({
  x: innerWidth / 2,        // starting x,y position of the sprite
  y: innerHeight / 2,
  color: 'black',  // fill color of the sprite rectangle
  width: 20,     // width and height of the sprite rectangle
  height: 20,
  angle: 0, //360 * Math.random(),
});

const chance = 0.5
const change = 30
const speed = 3
let loop = GameLoop({  // create the main game loop
  update: function () { // update the game state
    if (Math.random() < chance) {
      if (!sprite.isBouncing) {
        if (sprite.x > canvas.width - sprite.width - 10 || sprite.x < 10) {
          sprite.angle = 180 - sprite.angle;
        } else if (sprite.y > canvas.height - sprite.height - 10 || sprite.y < 10) {
          sprite.angle = -sprite.angle
        }
        sprite.isBouncing = true
      }

      if (
        sprite.isBouncing && (
          sprite.x < canvas.width - sprite.width - 100
          || sprite.y < canvas.height - sprite.height - 100
          || sprite.y > 100
          || sprite.x > 100
        )
      ) {
        sprite.isBouncing = false
      }

      sprite.angle = sprite.angle + (Math.random() * change * 2 - change)
      sprite.dx = speed * Math.cos(degToRad(sprite.angle))
      sprite.dy = speed * Math.sin(degToRad(sprite.angle))
    }
    sprite.update();
  },
  render: function () { // render the game state
    sprite.render();
  }
});

loop.start();    // start the game

