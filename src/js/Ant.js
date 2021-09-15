import {
  Sprite,
  SpriteSheet,
  degToRad,
  collides,
} from 'kontra';
import {
  drawTrail,
  exceedsTop,
  exceedsBottom,
  exceedsLeft,
  exceedsRight,
  getCanvasCenter,
  rotateSprite,
  getPixel,
} from './graphics'
import antSprite from '../assets/ant.png';
import antRedSprite from '../assets/ant_red.png';
import { getBlueness } from './util'

let antImage = new Image();
let antSpriteSheet
antImage.src = antSprite;
antImage.onload = () => {
  antSpriteSheet = SpriteSheet({
    image: antImage,
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
let antRedImage = new Image();
let antRedSpriteSheet
antRedImage.src = antRedSprite;
antRedImage.onload = () => {
  antRedSpriteSheet = SpriteSheet({
    image: antRedImage,
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

let counter = 0
class Ant extends Sprite.class {
  constructor() {
    const angle = 360 * Math.random()
    const { x, y } = getCanvasCenter()
    let sprite = antRedSpriteSheet
    let isExplorer = false
    if (counter === 0) {
      counter = explorerRatio
      isExplorer = true
      sprite = antSpriteSheet
    }
    counter--
    super({
      x: x + 10 * Math.cos(degToRad(angle)),
      y: y + 10 * Math.sin(degToRad(angle)),
      width: antSize,
      height: antSize,
      angle: angle,
      angleDelta: 0,
      // anchor: { x: 0.5, y: 0.5 },
      animations: sprite.animations,
      currentAnimation: sprite.animations.walk,
      timeSinceLastCollision: 0,
      speed: speed,
      isExplorer,
      onDown() {
        this.speed = 2.5 * speed
        this.timeout = setTimeout(() => {
          this.speed = speed
        }, 3000)
      }
    })
  }

  draw() {
    rotateSprite(this.angle, this.height / 2, () => {
      super.draw()
    })
  }

  updateDirection(canvasCache) {
    if (canvasCache) {
      if (!this.isExplorer) {
        const front = getPixel(
          this.x + this.dx * lookoutDistance,
          this.y + this.dy * lookoutDistance,
          canvasCache
        )
        if (getBlueness(front) > 0.1) {
          this.dx = this.speed * Math.cos(degToRad(this.angle))
          this.dy = this.speed * Math.sin(degToRad(this.angle))
          return; // Maintain current route
        }

        const dxRight = lookoutDistance * Math.cos(degToRad(this.angle - lookoutAngle))
        const dyRight = lookoutDistance * Math.sin(degToRad(this.angle - lookoutAngle))
        const dxLeft = lookoutDistance * Math.cos(degToRad(this.angle + lookoutAngle))
        const dyLeft = lookoutDistance * Math.sin(degToRad(this.angle + lookoutAngle))
        const right = getPixel(this.x + dxRight, this.y + dyRight, canvasCache)
        const left = getPixel(this.x + dxLeft, this.y + dyLeft, canvasCache)

        const rightBlueness = getBlueness(right)
        const leftBlueness = getBlueness(left)
        const turnChance = Math.random() * 0.3

        if (rightBlueness > leftBlueness && rightBlueness > turnChance) {
          this.angle = this.angle - lookoutAngle / 3
          // ant.angleDelta = -lookoutAngle / 3
          this.dx = this.speed * Math.cos(degToRad(this.angle))
          this.dy = this.speed * Math.sin(degToRad(this.angle))
        } else if (leftBlueness > rightBlueness && leftBlueness > turnChance) {
          this.angle = this.angle + lookoutAngle / 3
          // ant.angleDelta = lookoutAngle / 3
          this.dx = this.speed * Math.cos(degToRad(this.angle))
          this.dy = this.speed * Math.sin(degToRad(this.angle))
        }
      }
    }

    // Random change of direction
    if (Math.random() < chance) {
      this.angle = this.angle + (Math.random() * change * 2 - change)
      // ant.angleDelta = Math.random() * change * 2 - change
      this.dx = this.speed * Math.cos(degToRad(this.angle))
      this.dy = this.speed * Math.sin(degToRad(this.angle))
    }
  }

  checkBoundaries() {
    if (!this.isBouncing) {
      if (exceedsLeft(this.x) || exceedsRight(this.x)) {
        this.angle = 180 - this.angle
        this.isBouncing = true
        this.updateDirection()
      } else if (exceedsTop(this.y) || exceedsBottom(this.y)) {
        this.angle = -this.angle
        this.isBouncing = true
        this.updateDirection()
      }
    }

    if (
      this.isBouncing && (
        !exceedsRight(this.x)
        && !exceedsLeft(this.x)
        && !exceedsTop(this.y)
        && !exceedsBottom(this.y)
      )
    ) {
      this.isBouncing = false
    }
  }

  // very badddddd
  checkCollisions(otherAnts) {
    let hasCollision = false
    otherAnts.forEach(otherAnt => {
      if (Date.now() - otherAnt.timeSinceLastCollision > collisionCooldownTime) {
        if (collides(this, otherAnt)) {
          hasCollision = true
          otherAnt.angle += collisionAngle
        }
        otherAnt.timeSinceLastCollision = Date.now()
      }
    })
    if (hasCollision) {
      this.angle += collisionAngle
    }
  }

  makeTrail() {
    drawTrail(this.x, this.y, this.isExplorer)
  }
}

export default Ant