import { shoot, gameIsOver, getShotResultMessage } from './game.logic.js';
import createFleet from './entities/fleet/fleet.factory.js';
import createBoard from './entities/board/board.factory.js';
import { stringIsValidCoordinates } from './utils/coordinate.utils.js';
import {
  renderEmptyLine, getHeader, getHeaderSeparator, getRow
} from './utils/board-render.utils.js';

const renderBoard = (board) => {
  renderEmptyLine();

  const header = `  | ${getHeader(board[0].length)}`;
  const topSeparator = `--|${getHeaderSeparator(board[0].length)}`;

  console.log(header);
  console.log(topSeparator);

  board.forEach((row, rowIndex) => {
    const rowContent = getRow(row, rowIndex);
    console.log(rowContent);
  });

  renderEmptyLine();
};

const initializeScreen = (inputStream) => {
  console.clear();
  inputStream.setPrompt('Inpuit shot coordinates > ');
};

const processUserInput = (userInput, fleet, boardDimensions, board) => {
  const coordiantes = userInput.trim();

  if (!stringIsValidCoordinates(coordiantes)) {
    console.log("Invalid input, please type valid coordinates, e.g. A1, D6, etc.");
    return;
  }

  const shotResult = shoot(fleet, coordiantes, boardDimensions, board);
  const shotResultMessage = getShotResultMessage(shotResult, coordiantes);

  if (shotResultMessage) {
    console.log(shotResultMessage);
  }

  if (gameIsOver(fleet)) {
    console.log("All ships were sunk, you win!");
    process.exit();
  }
};

const processFrame = (inputStream, line, gameConfig, fleet, board) => {
  console.clear();

  processUserInput(line, fleet, gameConfig.boardDimensions, board);
  renderBoard(board);

  inputStream.prompt();
};

export const runGameLoopFactoryFunction = (_createBoard, _createFleet) =>
  (inputStream, gameConfig) => {
    const board = _createBoard(gameConfig.boardDimensions);
    const fleet = _createFleet(gameConfig);

    initializeScreen(inputStream);
    renderBoard(board);

    inputStream.prompt();
    inputStream.on('line', line => processFrame(inputStream, line, gameConfig, fleet, board));
  };

const runGameLoop = runGameLoopFactoryFunction(createBoard, createFleet);
export default runGameLoop;
