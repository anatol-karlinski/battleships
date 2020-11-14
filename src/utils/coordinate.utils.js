export const convertMatrixIndicesToCoordinates = (rowIndex, columnIndex) =>
  `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1}`;

export const convertCoordinatesToMatrixIndices = (coordinates) => ({
  rowIndex: coordinates.charCodeAt(0) - 65,
  columnIndex: Number(/[0-9]+/.exec(coordinates)[0]) - 1
});

export const getShipForCoordinates = (fleet, coordinates) => {
  let ship = void 0;

  for (let i = 0; i < fleet.length; i++) {
    for (let j = 0; j < fleet[i].coordinates.length; j++) {
      if (coordinates.some(c => c === fleet[i].coordinates[j])) {
        ship = fleet[i];
        break;
      }
    }
  }
  return ship;
};


export const coordinatesAreOccupied = (fleet, coordinates) =>
  !!getShipForCoordinates(fleet, coordinates);