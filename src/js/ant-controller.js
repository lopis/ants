import { track } from 'kontra'
import Ant from './Ant'

export let ants = [];
let antQueue = 0;
let isCreatingAnt = false

export const createAnt = (color = 'black') => {
  if (antQueue === 0) {
    isCreatingAnt = false
    return
  }
  antQueue--
  const ant = new Ant()
  ant.playAnimation('walk');
  ants.push(ant)
  track(ant);
  setTimeout(createAnt, 100)
}

export const scheduleNewAnt = () => {
  antQueue++
  if (isCreatingAnt) {
    return
  }
  isCreatingAnt = true
  createAnt()
}