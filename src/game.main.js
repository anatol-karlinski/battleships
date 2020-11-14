import runGameLoop from './game.main.functions.js';
import { initializeInputStream } from './utils/input.utils.js';
import gameConfig, { validateConfig } from './game.config.js';

const startGame = () => {
  const inputStream = initializeInputStream();
  validateConfig(gameConfig);
  runGameLoop(inputStream, gameConfig);
};

startGame();

