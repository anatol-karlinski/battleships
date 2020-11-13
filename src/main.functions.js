import { emitKeypressEvents, createInterface } from 'readline';
import { shootShip } from './logic/actions.js'
import { gameIsOver } from './logic/state.js'
import shotResultType from './types/shot-result.types.js'

const stringIsValidCoordinates = (string) => /[A-Z]+[0-9]+$/.test(string)

const displayShotResultMessage = (shotResult, coordiantes) => {
  switch (shotResult) {
    case shotResultType.HIT:
      console.log(`${coordiantes} - Hit!`)
      break
    case shotResultType.ALREADY_HIT:
      console.log(`${coordiantes} - Already hit!`)
      break
    case shotResultType.MISS:
      console.log(`${coordiantes} - Miss!`)
      break
    case shotResultType.OUT_OF_BOUNDS:
      console.log(`${coordiantes} - Out of bounds!`)
      break
    default: break
  }
}

export const handleUserInput = (userInput, fleet, boardDimensions) => {
  const coordiantes = userInput.trim()

  if (!stringIsValidCoordinates(coordiantes)) {
    console.log("Invalid input, please type valid coordinates, e.g. B10")
    return
  }

  const shotResult = shootShip(fleet, coordiantes, boardDimensions)
  displayShotResultMessage(shotResult, coordiantes)

  if (gameIsOver(fleet)) {
    console.log("All ships were sunk, you win!")
    process.exit();
  }
}

export const initializeScreen = (inputStream) => {
  console.clear()
  inputStream.setPrompt('Inpuit shot coordinates > ');
  inputStream.prompt();
}

export const initializeInputStream = () => {
  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  return createInterface(process.stdin, process.stdout)
}