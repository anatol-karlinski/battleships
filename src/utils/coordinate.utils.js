export const convertMatrixIndicesToCoordinates = (rowIndex, columnIndex) =>
  `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1}`

export const convertCoordinatesToMatrixIndices = (coordinates) => ({
  rowIndex: coordinates.charCodeAt(0) - 65,
  columnIndex: Number(/[0-9]+/.exec(coordinates)[0]) - 1
})

export const getShipForCoordinates = (fleet, coordinates) =>
  fleet.find(ship => ship.coordinates.some(coordinate => coordinates.includes(coordinate)))

export const coordinatesAreOccupied = (fleet, coordinates) =>
  !!getShipForCoordinates(fleet, coordinates)