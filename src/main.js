import {
  initializeInputStream, initializeScreen,
  handleUserInput, renderBoard
} from './main.functions.js';
import createFleet from './entities/fleet/fleet.factory.js';
import createBoard from './entities/board/board.factory.js';
import gameConfig, { validateConfig } from './game.config.js';

const main = (inputStream, gameConfig) => {
  const fleet = createFleet(gameConfig);
  const board = createBoard(gameConfig.boardDimensions, fleet);

  initializeScreen(inputStream);
  renderBoard(board);
  inputStream.prompt();

  inputStream
    .on('line', line => {
      console.clear();

      handleUserInput(line, fleet, gameConfig.boardDimensions, board);
      renderBoard(board);

      inputStream.prompt();
    });
};

const inputStream = initializeInputStream();

validateConfig(gameConfig);
main(inputStream, gameConfig);




