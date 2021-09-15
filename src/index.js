import {
  GameLoop,
  bindKeys,
  emit,
  initKeys,
  initPointer,
  on,
  track,
  unbindKeys,
} from 'kontra';
import './constants'
import {
  renderIntro,
  renderStatus,
  fade,
} from './js/graphics'
import { loadHole, renderHole } from './js/Hole'
import { scheduleNewAnt, ants } from './js/ant-controller'

let fadeTimer = 0
let loop = GameLoop({  // create the main game loop
  update: function () { // update the game state
    try {
      // Use a full canvas cache to avoid doing getImageData for each ant
      const canvasCache = ctb.getImageData(0, 0, back.width, back.height).data
      ants.forEach((ant, index) => {
        ant.checkBoundaries()
        // ant.checkCollisions(ants.slice(index + 1))
        ant.updateDirection(canvasCache)
        ant.update()
        ant.makeTrail()
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
      }
      renderStatus()
      renderHole()
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
  renderIntro();
})

loadHole();

