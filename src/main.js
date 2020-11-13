import { initializeInputStream, initializeScreen, handleUserInput } from './main.functions.js';
import createFleet from './entities/fleet/fleet.factory.js';
import gameConfig from './game.config.js';

const main = (inputStream, gameConfig) => {
  initializeScreen(inputStream);
  const fleet = createFleet(gameConfig);

  inputStream
    .on('line', line => {
      console.clear();

      handleUserInput(line, fleet, gameConfig.boardDimensions);
      console.log(fleet.map(s => s.coordinates));

      inputStream.prompt();
    });
};

const inputStream = initializeInputStream();
main(inputStream, gameConfig);




