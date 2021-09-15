export const getBlueness = ([red, green, blue]) => {
  return Math.max(0, (blue - (red + green) / 2)) / 255
}

export const getGreeness = ([red, green, blue]) => {
  return Math.max(0, (green - (red + blue) / 2)) / 255
}