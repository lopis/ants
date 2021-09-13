import {
  GameLoop,
  Sprite,
  SpriteSheet,
  Text,
  bindKeys,
  collides,
  degToRad,
  emit,
  init,
  initKeys,
  initPointer,
  on,
  track,
  unbindKeys,
} from 'kontra';
import './constants'
import { getBlueness } from '../src/util'
import antSprite from './ant.png';
import holeSprite from './hole.png';

let { canvas, context } = init(main);

canvas.height = canvasHeight
canvas.width = canvasWidth

back.height = canvasHeight
back.width = canvasWidth
window.ctb = back.getContext`2d`
ctb.fillStyle = 'white'//`#8ab073`
ctb.fillRect(0, 0, canvasWidth, canvasHeight)

let ants = [];
let antQueue = 0;
let isCreatingAnt = false

let image = new Image();
let antSpriteSheet
image.src = antSprite;
image.onload = () => {
  antSpriteSheet = SpriteSheet({
    image: image,
    frameWidth: 25,
    frameHeight: 25,
    animations: {
      idle: {
        frames: '2'
      },
      walk: {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
        frameRate: 16
      }
    }
  })
}

let holePNG = new Image()
let hole
holePNG.src = holeSprite
holePNG.onload = () => {
  hole = Sprite({
    x: canvas.width / 2,        // starting x,y position of the sprite
    y: canvas.height / 2,
    image: holePNG,
    anchor: { x: 0.5, y: 0.5 }
  })
  emit('ready')
}

class Ant extends Sprite.class {
  draw() {
    context.rotate(degToRad(this.angle))
    context.translate(-(this.height / 2), -(this.height / 2))
    super.draw()
    context.translate(-(this.height / 2), (this.height / 2))
    context.rotate(degToRad(-this.angle))
  }
}

const scheduleNewAnt = () => {
  antQueue++
  if (isCreatingAnt) {
    return
  }
  isCreatingAnt = true
  createAnt()
}

const createAnt = (color = 'black') => {
  if (antQueue === 0) {
    isCreatingAnt = false
    return
  }
  antQueue--
  const angle = 360 * Math.random()
  const ant = new Ant({
    x: canvas.width / 2 + 10 * Math.cos(degToRad(angle)),        // starting x,y position of the sprite
    y: canvas.height / 2 + 10 * Math.sin(degToRad(angle)),
    // color: color,               // fill color of the sprite rectangle
    width: antSize,             // width and height of the sprite rectangle
    height: antSize,
    angle: angle,
    angleDelta: 0,
    //distance: 0, // Doesn't work very well
    // step: 1,
    // anchor: { x: 0.5, y: 0.5 },
    animations: antSpriteSheet.animations,
    currentAnimation: antSpriteSheet.animations.walk,
    timeSinceLastCollision: 0,
    speed: speed,
    onDown() {
      this.speed = 2.5 * speed
      this.timeout = setTimeout(() => {
        this.speed = speed
      }, 3000)
    }
  })
  ant.playAnimation('walk');
  ants.push(ant)
  track(ant);
  setTimeout(createAnt, 1000)
}

const collisionAngle = 90
const checkCollisions = (ant, otherAnts) => {
  let hasCollision = false
  otherAnts.forEach(otherAnt => {
    if (Date.now() - otherAnt.timeSinceLastCollision > 500) {
      if (collides(ant, otherAnt)) {
        hasCollision = true
        otherAnt.angle += collisionAngle
      }
      otherAnt.timeSinceLastCollision = Date.now()
    }
  })
  if (hasCollision) {
    ant.angle += collisionAngle
    console.log('collision');
  }
}

const updateDirection = (ant, chance, canvasCache) => {
  if (canvasCache) {
    if (ant.angleDelta > 0) {
      const delta = Math.min(angleDeltaStep, ant.angleDelta)
      ant.angle += delta
      ant.angleDelta -= delta
    } else if (ant.angleDelta < 0) {
      const delta = Math.max(-angleDeltaStep, ant.angleDelta)
      ant.angle += delta
      ant.angleDelta -= delta
    }

    const front = getPixel(
      ant.x + ant.dx * lookoutDistance,
      ant.y + ant.dy * lookoutDistance,
      canvasCache
    )
    if (getBlueness(front) > 0.5) {
      ant.dx = ant.speed * Math.cos(degToRad(ant.angle))
      ant.dy = ant.speed * Math.sin(degToRad(ant.angle))
      return; // Maintain current route
    }

    const dxRight = lookoutDistance * Math.cos(degToRad(ant.angle - lookoutAngle))
    const dyRight = lookoutDistance * Math.sin(degToRad(ant.angle - lookoutAngle))
    const dxLeft = lookoutDistance * Math.cos(degToRad(ant.angle + lookoutAngle))
    const dyLeft = lookoutDistance * Math.sin(degToRad(ant.angle + lookoutAngle))
    const right = getPixel(ant.x + dxRight, ant.y + dyRight, canvasCache)
    const left = getPixel(ant.x + dxLeft, ant.y + dyLeft, canvasCache)

    const rightBlueness = getBlueness(right)
    const leftBlueness = getBlueness(left)
    const turnChance = Math.random()

    if (rightBlueness > leftBlueness && rightBlueness > turnChance) {
      // ant.angle = ant.angle - lookoutAngle / 3
      ant.angleDelta = -lookoutAngle / 3
      ant.dx = ant.speed * Math.cos(degToRad(ant.angle))
      ant.dy = ant.speed * Math.sin(degToRad(ant.angle))
    } else if (leftBlueness > rightBlueness && leftBlueness > turnChance) {
      // ant.angle = ant.angle + lookoutAngle / 3
      ant.angleDelta = lookoutAngle / 3
      ant.dx = ant.speed * Math.cos(degToRad(ant.angle))
      ant.dy = ant.speed * Math.sin(degToRad(ant.angle))
    }
  }

  // Random change of direction
  if (Math.random() < chance) {
    // ant.angle = ant.angle + (Math.random() * change * 2 - change)
    ant.angleDelta = Math.random() * change * 2 - change
    ant.dx = ant.speed * Math.cos(degToRad(ant.angle))
    ant.dy = ant.speed * Math.sin(degToRad(ant.angle))
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
  ctb.translate(-(trailRadius / 2), -(trailRadius / 2))
  ctb.fillStyle = 'rgba(0, 0, 255, 0.1)'
  ctb.fillRect(Math.round(ant.x), Math.round(ant.y), trailRadius, trailRadius)
  ctb.translate((trailRadius / 2), (trailRadius / 2))
}

const fade = () => {
  ctb.fillStyle = `rgba(255,255,255,0.05)`
  ctb.fillRect(0, 0, canvasWidth, canvasHeight)
}

let status = Text({
  text: '60 FPS\n0 ants',
  font: '12px Arial',
  color: '#3c5f49',
  x: 10,
  y: 10,
  textAlign: 'left'
});

let intro = Text({
  text: [
    'Welcome to',
    '  A n t   S p a c e.',
    '',
    'Press [space] or touch the nest to call an ant.',
    'They tend to follow their friends, but they also',
    'like to explore on their own.',
    'Just sit back and enjoy your stay.'
  ].join('\n'),
  font: '16px Arial',
  color: '#3c5f49',
  x: 10,
  y: 50,
  textAlign: 'left',
  lineHeight: 1.5,
});


let fadeTimer = 0
let timer = 0
let loop = GameLoop({  // create the main game loop
  update: function () { // update the game state
    try {
      // Use a full canvas cache to avoid doing getImageData for each ant
      const canvasCache = ctb.getImageData(0, 0, back.width, back.height).data
      ants.forEach((ant, index) => {
        checkBoundaries(ant)
        checkCollisions(ant, ants.slice(index + 1))
        updateDirection(ant, chance, canvasCache)
        ant.update()
        trail(ant)
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
      })
      fadeTimer--
      if (fadeTimer <= 0) {
        fade()
        fadeTimer = 100
        status.text = `${Math.round(1000 / (Date.now() - timer))} FPS\n${ants.length} ants`
      }
      status.render()
      hole?.render()
      timer = Date.now()
    } catch (error) {
      console.error(error);
      emit('halt')
    }
  }
});

initKeys();
initPointer();
bindKeys('space', function () {
  scheduleNewAnt()
});

on('halt', () => {
  loop.stop()
})

on('ready', () => {
  bindKeys('space', function () {
    unbindKeys('space')
    scheduleNewAnt()
    loop.start();

    bindKeys('space', function () {
      scheduleNewAnt()
    });
  });
  intro.render();
  hole.render();
})
// loop.start();    // start the game

