import {
  Text,
  init,
  degToRad,
} from 'kontra';
import { ants } from './ant-controller'

let { canvas, context } = init(main);

canvas.height = canvasHeight
canvas.width = canvasWidth

back.height = canvasHeight
back.width = canvasWidth
window.ctb = back.getContext`2d`
ctb.fillStyle = 'white'//`#8ab073`
ctb.fillRect(0, 0, canvasWidth, canvasHeight)

export const drawTrail = (x, y, isExplorer) => {
  ctb.translate(-(trailRadius / 2), -(trailRadius / 2))
  ctb.fillStyle = `rgba(0, 0, 255, ${isExplorer ? 0.4 : 0.1})`
  ctb.fillRect(Math.round(x), Math.round(y), trailRadius, trailRadius)
  ctb.translate((trailRadius / 2), (trailRadius / 2))
}

let status, intro
const initTextObjects = () => {
  status = Text({
    text: '60 FPS\n0 ants',
    font: '12px Arial',
    color: '#3c5f49',
    x: 10,
    y: 10,
    textAlign: 'left'
  });
  intro = Text({
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
}

export const renderIntro = () => {
  initTextObjects()
  intro.render()
}

let statusTimer = statusRefreshDelay
let fpsTimer = 0
export const renderStatus = () => {
  statusTimer--
  if (statusTimer <= 0) {
    statusTimer = statusRefreshDelay
    status.text = `${Math.round(1000 / (Date.now() - fpsTimer))} FPS\n${ants.length} ants`
  }
  fpsTimer = Date.now()
  status.render()
}

export const exceedsTop = (y) => {
  return y < padding
}

export const exceedsBottom = (y) => {
  return y > canvas.height - padding
}

export const exceedsLeft = (y) => {
  return y < padding
}

export const exceedsRight = (x) => {
  return x > canvas.width - padding
}

export const getCanvasCenter = () => {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
}

export const rgbToHex = (r, g, b) => {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

export const getPixel = (x, y, cache) => {
  const index = 4 * (Math.round(y) * canvas.width + Math.round(x))
  return [
    cache[index],     // R
    cache[index + 1], // G
    cache[index + 2], // B
    cache[index + 3], // A
  ]
}

export const fade = () => {
  ctb.fillStyle = `rgba(255,255,255,0.05)`
  ctb.fillRect(0, 0, canvasWidth, canvasHeight)
}

export const rotateSprite = (angle, offset, fn) => {
  context.rotate(degToRad(angle))
  context.translate(-offset, -offset)
  fn()
  context.translate(offset, offset)
  context.rotate(degToRad(-angle))
}