import { getShipForCoordinates, convertCoordinatesToMatrixIndices } from './utils/coordinate.utils.js';
import shotResultType from './types/shot-result.types.js';

const shipWasDestroyed = ship => ship.destroyedSegments.length === ship.coordinates.length;
const shotWasOutOfBounds = (boardDimensions, shotPosition) => shotPosition.rowIndex > boardDimensions.width - 1 || shotPosition.columnIndex > boardDimensions.height - 1;
const segmentWasAlreadyDestroyed = (ship, shotCoordinates) => ship.destroyedSegments.some(s => s === shotCoordinates);

export const gameIsOver = fleet => fleet.every(ship => ship.sunken);

export const shootFactoryFunction = (getShipForCoordinates, convertCoordinatesToMatrixIndices) =>
  (fleet, coordinates, boardDimensions, board) => {
    const shotPosition = convertCoordinatesToMatrixIndices(coordinates);

    if (shotWasOutOfBounds(boardDimensions, shotPosition)) {
      return shotResultType.OUT_OF_BOUNDS;
    }

    const ship = getShipForCoordinates(fleet, [coordinates]);

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

export const shoot = shootFactoryFunction(getShipForCoordinates, convertCoordinatesToMatrixIndices);