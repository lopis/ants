import {
  Sprite,
  emit,
  track,
} from 'kontra'
import { scheduleNewAnt } from './ant-controller'
import { getCanvasCenter } from './graphics'
import holeSprite from '../assets/hole.png';

let hole

export const loadHole = () => {
  let holePNG = new Image()
  holePNG.src = holeSprite
  const { x, y } = getCanvasCenter()
  holePNG.onload = () => {
    hole = Sprite({
      x,
      y,
      height: holeSize,
      width: holeSize,
      image: holePNG,
      anchor: { x: 0.5, y: 0.5 },
      onDown() {
        scheduleNewAnt()
        if (loop.isStopped) {
          loop.start();
        }
      },
    })
    emit('ready')
    track(hole);
    hole.render();
  }
}

export const renderHole = () => {
  hole.render();
}