import {
  convertMatrixIndicesToCoordinates, getShipForCoordinates
} from './../../utils/coordinate.utils.js'

// eslint-disable-next-line no-unused-vars
export default (boardDimensions, fleet) => {
  const board = [...Array(boardDimensions.width)].map(() => Array(boardDimensions.height).fill(0));

  // board.forEach((row, rowIndex) => {
  //   row.forEach((_, cellIndex) => {
  //     const coordinatesForCell = convertMatrixIndicesToCoordinates(rowIndex, cellIndex);
  //     const ship = getShipForCoordinates(fleet, [coordinatesForCell])
  //     if (ship) {
  //       board[cellIndex][rowIndex] = ship
  //     }
  //   })
  // });

  return board;
}