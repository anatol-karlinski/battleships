import { emitKeypressEvents, createInterface } from 'readline';
import { shootShip, gameIsOver } from './logic/logic.js';
import shotResultType from './types/shot-result.types.js';

const stringIsValidCoordinates = (string) => /[A-Z]+[0-9]+$/.test(string);

const displayShotResultMessage = (shotResult, coordiantes) => {
  switch (shotResult) {
    case shotResultType.HIT:
      console.log(`${coordiantes} - Hit!`);
      break;
    case shotResultType.HIT_AND_SUNK:
      console.log(`${coordiantes} - Hit! Ship sunk!`);
      break;
    case shotResultType.ALREADY_HIT:
      console.log(`${coordiantes} - Already hit!`);
      break;
    case shotResultType.MISS:
      console.log(`${coordiantes} - Miss!`);
      break;
    case shotResultType.OUT_OF_BOUNDS:
      console.log(`${coordiantes} - Out of bounds!`);
      break;
    default: break;
  }
};

export const renderBoard = (board) => {
  console.log()

  const header = new Array(board[0].length).fill(0).map((_, i) => String.fromCharCode(65 + i)).join(' ')
  console.log("  | " + header)
  console.log("--|" + new Array(board[0].length * 2).fill(0).map(() => "-").join(""));

  board.forEach((row, rowIndex) => {
    const rowContent = `${(rowIndex + 1).toString().padEnd(2, ' ')}| ${row.map(e => {
      if (e === shotResultType.HIT)
        return "X"
      if (e === shotResultType.MISS)
        return "O"

      return "*"
    }).join(" ")}`
    console.log(rowContent)
  });

  console.log()
};

export const handleUserInput = (userInput, fleet, boardDimensions, board) => {
  const coordiantes = userInput.trim();

  if (!stringIsValidCoordinates(coordiantes)) {
    console.log("Invalid input, please type valid coordinates, e.g. B10");
    return;
  }

  const shotResult = shootShip(fleet, coordiantes, boardDimensions, board);
  displayShotResultMessage(shotResult, coordiantes);

  if (gameIsOver(fleet)) {
    console.log("All ships were sunk, you win!");
    process.exit();
  }
};

export const initializeScreen = (inputStream) => {
  console.clear();
  inputStream.setPrompt('Inpuit shot coordinates > ');
};

export const initializeInputStream = () => {
  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  return createInterface(process.stdin, process.stdout);
};