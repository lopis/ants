

import { init, Sprite, GameLoop, degToRad } from 'kontra';

let { canvas } = init();

canvas.height = innerHeight
canvas.width = innerWidth

let ants = [];

const spriteSize = 5
const createAnt = () => {
  ants.push(Sprite({
    x: innerWidth / 2,        // starting x,y position of the sprite
    y: innerHeight / 2,
    color: 'black',  // fill color of the sprite rectangle
    width: spriteSize,     // width and height of the sprite rectangle
    height: spriteSize,
    angle: 360 * Math.random(),
  }))
}
const chance = 0.2
const change = 45
const speed = 1
const padding = 10

const updateDirection = (sprite, chance) => {
  if (Math.random() < chance) {
    sprite.angle = sprite.angle + (Math.random() * change * 2 - change)
    sprite.dx = speed * Math.cos(degToRad(sprite.angle))
    sprite.dy = speed * Math.sin(degToRad(sprite.angle))
  }
}

const checkBoundaries = (sprite) => {
  if (!sprite.isBouncing) {
    if (sprite.x > canvas.width - padding || sprite.x < padding) {
      sprite.angle = 180 - sprite.angle
      sprite.isBouncing = true
      updateDirection(sprite, 1)
    } else if (sprite.y > canvas.height - padding || sprite.y < padding) {
      sprite.angle = -sprite.angle
      sprite.isBouncing = true
      updateDirection(sprite, 1)
    }
  }

  if (
    sprite.isBouncing && (
      sprite.x < canvas.width - padding
      && sprite.y < canvas.height - padding
      && sprite.y > padding
      && sprite.x > padding
    )
  ) {
    sprite.isBouncing = false
  }
}


createAnt()
createAnt()
createAnt()
createAnt()
createAnt()
createAnt()
createAnt()
createAnt()
createAnt()

let loop = GameLoop({  // create the main game loop
  update: function () { // update the game state
    ants.forEach(ant => {
      checkBoundaries(ant)
      updateDirection(ant, chance)
      ant.update();
    })
  },
  render: function () { // render the game state
    ants.forEach(ant => {
      checkBoundaries(ant)
      updateDirection(ant, chance)
      ant.render();
    })
  }
});

loop.start();    // start the game

