import { getShipForCoordinates, convertCoordinatesToMatrixIndices } from './utils/coordinate.utils.js';
import shotResultType from './types/shot-result.types.js';

const shipWasDestroyed = ship => ship.destroyedSegments.length === ship.coordinates.length;
const shotWasOutOfBounds = (boardDimensions, shotPosition) => shotPosition.rowIndex > boardDimensions.height - 1 || shotPosition.columnIndex > boardDimensions.width - 1;
const segmentWasAlreadyDestroyed = (ship, shotCoordinates) => ship.destroyedSegments.some(s => s === shotCoordinates);

export const gameIsOver = fleet => fleet.every(ship => ship.sunken);

export const shootFactoryFunction = (_getShipForCoordinates, _convertCoordinatesToMatrixIndices) =>
  (fleet, coordinates, boardDimensions, board) => {
    const shotPosition = _convertCoordinatesToMatrixIndices(coordinates);

    if (shotWasOutOfBounds(boardDimensions, shotPosition)) {
      return shotResultType.OUT_OF_BOUNDS;
    }

    const ship = _getShipForCoordinates(fleet, [coordinates]);

    if (!ship) {
      board[shotPosition.columnIndex][shotPosition.rowIndex] = shotResultType.MISS;
      return shotResultType.MISS;
    }

    if (segmentWasAlreadyDestroyed(ship, coordinates)) {
      return shotResultType.ALREADY_HIT;
    }

    ship.destroyedSegments.push(coordinates);
    board[shotPosition.columnIndex][shotPosition.rowIndex] = shotResultType.HIT;

    if (shipWasDestroyed(ship)) {
      ship.sunken = true;
      return shotResultType.HIT_AND_SUNK;
    }

    return shotResultType.HIT;
  };

export const getShotResultMessage = (shotResult, coordiantes) => {
  switch (shotResult) {
    case shotResultType.HIT:
      return `${coordiantes} - Hit!`;
    case shotResultType.HIT_AND_SUNK:
      return `${coordiantes} - Hit! Ship sunk!`;
    case shotResultType.ALREADY_HIT:
      return `${coordiantes} - Already hit!`;
    case shotResultType.MISS:
      return `${coordiantes} - Miss!`;
    case shotResultType.OUT_OF_BOUNDS:
      return `${coordiantes} - Out of bounds!`;
    default:
      return "";
  }
};

export const shoot = shootFactoryFunction(getShipForCoordinates, convertCoordinatesToMatrixIndices);
