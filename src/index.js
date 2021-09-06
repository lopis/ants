

import {
  init,
  Sprite,
  GameLoop,
  degToRad,
  on,
  emit
} from 'kontra';

let { canvas, context } = init(main);

canvas.height = innerHeight
canvas.width = innerWidth


back.height = innerHeight
back.width = innerWidth
window.ctb = back.getContext`2d`
ctb.fillStyle = 'white'//`#8ab073`
ctb.fillRect(0, 0, innerWidth, innerHeight)


let ants = [];

const antSize = 4
const trailRadius = 2
const chance = 0.05
const change = 10
const speed = 0.4
const padding = 10

const RED = 0
const GREEN = 1
const BLUE = 2
const ALPHA = 3

const createAnt = (color = 'black') => {
  ants.push(Sprite({
    x: canvas.width / 2,        // starting x,y position of the sprite
    y: canvas.height / 2,
    color: color,               // fill color of the sprite rectangle
    width: antSize,             // width and height of the sprite rectangle
    height: antSize,
    angle: 360 * Math.random(),
  }))
}


const isBlue = ([red, green, blue, alpha]) => {
  return blue > 200 && red < 100 && green < 100
}

const lookoutAngle = 90
const lookoutDistance = 2 * trailRadius
const updateDirection = (ant, chance, canvasCache) => {
  if (canvasCache) {
    const dxRight = lookoutDistance * Math.cos(degToRad(ant.angle - lookoutAngle))
    const dyRight = lookoutDistance * Math.sin(degToRad(ant.angle - lookoutAngle))
    const dxLeft = lookoutDistance * Math.cos(degToRad(ant.angle + lookoutAngle))
    const dyLeft = lookoutDistance * Math.sin(degToRad(ant.angle + lookoutAngle))
    const right = getPixel(ant.x + dxRight, ant.y + dyRight, canvasCache)
    const left = getPixel(ant.x + dxLeft, ant.y + dyLeft, canvasCache)
    // console.log(right, left);

    // ctb.fillStyle = 'magenta'
    // ctb.fillRect(Math.round(ant.x + dxRight), Math.round(ant.y + dyRight), 1, 1)
    // ctb.fillStyle = 'cyan'
    // ctb.fillRect(Math.round(ant.x + dxLeft), Math.round(ant.y + dyLeft), 1, 1)

    if (isBlue(right)) {
      // ctb.fillStyle = 'magenta'
      // ctb.rect(Math.round(ant.x + dxRight) - 1, Math.round(ant.y + dyRight) - 1, 3, 3)
      // console.log('Found trail on the right');
      ant.angle = ant.angle - lookoutAngle / 3
      ant.dx = speed * Math.cos(degToRad(ant.angle))
      ant.dy = speed * Math.sin(degToRad(ant.angle))
    } else if (isBlue(left)) {
      // ctb.fillStyle = 'magenta'
      // ctb.fillRect(Math.round(ant.x + dxLeft) - 1, Math.round(ant.y + dyLeft) - 1, 3, 3)
      // console.log('Found trail on the left');
      ant.angle = ant.angle + lookoutAngle / 3
      ant.dx = speed * Math.cos(degToRad(ant.angle))
      ant.dy = speed * Math.sin(degToRad(ant.angle))
    }
  }

  // Random change of direction
  if (Math.random() < chance) {
    ant.angle = ant.angle + (Math.random() * change * 2 - change)
    ant.dx = speed * Math.cos(degToRad(ant.angle))
    ant.dy = speed * Math.sin(degToRad(ant.angle))
  }
}

const checkBoundaries = (ant) => {
  if (!ant.isBouncing) {
    if (ant.x > canvas.width - padding || ant.x < padding) {
      ant.angle = 180 - ant.angle
      ant.isBouncing = true
      updateDirection(ant, 1)
    } else if (ant.y > canvas.height - padding || ant.y < padding) {
      ant.angle = -ant.angle
      ant.isBouncing = true
      updateDirection(ant, 1)
    }
  }

  if (
    ant.isBouncing && (
      ant.x < canvas.width - padding
      && ant.y < canvas.height - padding
      && ant.y > padding
      && ant.x > padding
    )
  ) {
    ant.isBouncing = false
  }
}

const rgbToHex = (r, g, b) => {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

const getPixel = (x, y, cache) => {
  const index = 4 * (Math.round(y) * canvas.width + Math.round(x))
  return [
    cache[index],     // R
    cache[index + 1], // G
    cache[index + 2], // B
    cache[index + 3], // A
  ]
}

const trail = (ant) => {
  ctb.fillStyle = 'blue' //'#738ab0'
  ctb.fillRect(Math.round(ant.x), Math.round(ant.y), trailRadius, trailRadius)
}

const fade = () => {
  ctb.fillStyle = `rgba(255,255,255,0.05)`
  ctb.fillRect(0, 0, innerWidth, innerHeight)
}


createAnt('red')
createAnt('orange')
createAnt('pink')
createAnt('yellow')
createAnt('green')
createAnt('lime')
createAnt('gray')
createAnt('brown')
createAnt('black')


let fadeTimer = 0
let loop = GameLoop({  // create the main game loop
  update: function () { // update the game state
    try {
      // Use a full canvas cache to avoid doing getImageData for each ant
      const canvasCache = ctb.getImageData(0, 0, back.width, back.height).data
      ants.forEach(ant => {
        checkBoundaries(ant)
        updateDirection(ant, chance, canvasCache)
        ant.update()
      })
    } catch (error) {
      console.error(error);
      emit('halt')
    }
  },
  render: function () { // render the game state
    try {
      ants.forEach(ant => {
        ant.render()
        trail(ant)
      })
      fadeTimer--
      if (fadeTimer <= 0) {
        fade()
        fadeTimer = 100
      }
    } catch (error) {
      console.error(error);
      emit('halt')
    }
  }
});

on('halt', () => {
  loop.stop()
})
loop.start();    // start the game

