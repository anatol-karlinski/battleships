export const convertMatrixIndicesToCoordinates = (rowIndex, columnIndex) =>
  `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1}`;

export const convertCoordinatesToMatrixIndices = (coordinates) => ({
  rowIndex: coordinates.charCodeAt(0) - 65,
  columnIndex: Number(/[0-9]+/.exec(coordinates)[0]) - 1
});

export const getShipForCoordinates = (fleet, coordinates) => {
  for (let i = 0; i < fleet.length; i++) {
    const intersectingCoordinates = fleet[i].coordinates.filter(value => coordinates.includes(value));

    if (intersectingCoordinates.length > 0) {
      return fleet[i];
    }
  }

  return void 0;
};

export const coordinatesAreOccupied = (fleet, coordinates) =>
  !!getShipForCoordinates(fleet, coordinates);

export const stringIsValidCoordinates = (string) => /[A-Z]+[0-9]+$/.test(string);
