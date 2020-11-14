import { getShipForCoordinates, convertCoordinatesToMatrixIndices } from '../utils/coordinate.utils.js';
import shotResultType from './../types/shot-result.types.js';

export const gameIsOver = fleet => fleet.every(ship => ship.sunken);
export const shipIsDestroyed = ship => ship.destroyedSegments.length === ship.coordinates.length;

export const shootShip = (fleet, coordinates, boardDimensions, board) => {
  const boardPositionOfShot = convertCoordinatesToMatrixIndices(coordinates);

  if (boardPositionOfShot.rowIndex > boardDimensions.width - 1 || boardPositionOfShot.columnIndex > boardDimensions.height - 1) {
    return shotResultType.OUT_OF_BOUNDS;
  }

  const ship = getShipForCoordinates(fleet, [coordinates]);

  if (!ship) {
    board[boardPositionOfShot.columnIndex][boardPositionOfShot.rowIndex] = shotResultType.MISS
    return shotResultType.MISS;
  }

  if (ship.destroyedSegments.some(s => s === coordinates)) {
    return shotResultType.ALREADY_HIT;
  }

  ship.destroyedSegments.push(coordinates);
  board[boardPositionOfShot.columnIndex][boardPositionOfShot.rowIndex] = shotResultType.HIT

  if (ship.destroyedSegments.length === ship.coordinates.length) {
    ship.sunken = true;
    return shotResultType.HIT_AND_SUNK;
  }

  return shotResultType.HIT;
};
