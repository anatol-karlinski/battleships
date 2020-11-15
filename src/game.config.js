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
  const boardHasValidDimensions = (_config) =>
    _config.boardDimensions.width > 0 && _config.boardDimensions.height;

  const fleetFitsOnBoard = (_config) => {
    const boardVolume = _config.boardDimensions.width * _config.boardDimensions.height;
    const shipTypes = Object.keys(_config.fleetComposition);
    const fleetVolume = shipTypes.reduce((volume, shipType) => {
      return volume + _config.fleetComposition[shipType] + _config.shipSizes[shipType];
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
