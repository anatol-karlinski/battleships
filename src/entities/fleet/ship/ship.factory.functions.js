import { getRandomPosition } from './../../../utils/random.utils.js';
import { coordinatesAreOccupied } from './../../../utils/coordinate.utils.js';
import orientationType from './../../../types/orientation.types.js';

const convertMatrixIndicesToCoordinates = (rowIndex, columnIndex) =>
  `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1}`;

const getPositionOffsetForOrientation = (orientation, position, offset) =>
  orientation === orientationType.VERTICAL ?
    { x: position.x, y: position.y + offset } :
    { x: position.x + offset, y: position.y };

const getRandomCoordinates = (boardDimensions, shipSize, shipOrientation) => {
  let position = shipOrientation === orientationType.VERTICAL ?
    getRandomPosition(boardDimensions.width - 1, boardDimensions.height - 1 - shipSize) :
    getRandomPosition(boardDimensions.width - 1 - shipSize, boardDimensions.height - 1);

  let randomShipCoordinates = [];

  for (let i = 0; i < shipSize; i++) {
    const segmentPosition = getPositionOffsetForOrientation(shipOrientation, position, i);
    randomShipCoordinates.push(convertMatrixIndicesToCoordinates(segmentPosition.x, segmentPosition.y));
  }

  return randomShipCoordinates;
};

export const getCoordinatesForNewShip = (fleet, boardDimensions, shipSize, shipOrientation) => {
  let shipCoordinates = [];

  do {
    shipCoordinates = getRandomCoordinates(boardDimensions, shipSize, shipOrientation);
  } while (coordinatesAreOccupied(fleet, shipCoordinates));

  return shipCoordinates;
};