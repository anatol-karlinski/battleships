const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomPosition = (width, height) => ({
  x: getRandomInt(0, width),
  y: getRandomInt(0, height)
})

export const getRandomOrientation = () => getRandomInt(1, 2)
