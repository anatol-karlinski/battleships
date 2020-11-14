export default {
  boardDimensions: {
    width: 10,
    height: 10
  },
  fleetComposition: {
    BATTLESHIP: 1,
    DESTROYER: 2
  },
  shipSizes: {
    BATTLESHIP: 5,
    DESTROYER: 4
  }
};

export const validateConfig = (config) => {
  const boardHasValidDimensions = (config) =>
    config.boardDimensions.width > 0 && config.boardDimensions.height;

  const fleetFitsOnBoard = (config) => {
    const boardVolume = config.boardDimensions.width * config.boardDimensions.height;
    const shipTypes = Object.keys(config.fleetComposition);
    const fleetVolume = shipTypes.reduce((volume, shipType) => {
      return volume + config.fleetComposition[shipType] + config.shipSizes[shipType];
    }, 0);

    return boardVolume >= fleetVolume;
  };

  if (!boardHasValidDimensions(config)) {
    console.error("ERROR: Game board dimensions are invalid!");
    process.exit();
  }

  if (!fleetFitsOnBoard(config)) {
    console.error("ERROR: Fleet is too big for game board!");
    process.exit();
  }
};