import { getRandomPosition } from './../../../utils/random.utils.js';
import { coordinatesAreOccupied } from './../../../utils/coordinate.utils.js';
import orientationType from './../../../types/orientation.types.js';

const convertMatrixIndicesToCoordinates = (rowIndex, columnIndex) =>
  `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1}`;

const getPositionOffsetForOrientation = (orientation, position, offset) =>
  orientation === orientation.VERTICAL ?
    { x: position.x, y: position.y + offset } :
    { x: position.x + offset, y: position.y };

const getRandomCoordinates = (boardDimensions, shipSize, shipOrientation) => {
  let position = shipOrientation === orientationType.VERTICAL ?
    getRandomPosition(boardDimensions.width - shipSize, boardDimensions.height) :
    getRandomPosition(boardDimensions.width, boardDimensions.height - shipSize);

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