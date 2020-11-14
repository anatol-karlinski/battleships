import {
  initializeInputStream, initializeScreen,
  handleUserInput, renderBoard
} from './main.functions.js';
import createFleet from './entities/fleet/fleet.factory.js';
import createBoard from './entities/board/board.factory.js'
import gameConfig from './game.config.js';

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

      // console.log(fleet.map(f => f.coordinates))

      inputStream.prompt();
    });
};

const inputStream = initializeInputStream();
main(inputStream, gameConfig);




