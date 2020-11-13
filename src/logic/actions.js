import { getShipForCoordinates, convertCoordinatesToMatrixIndices } from '../utils/coordinate.utils.js'
import shotResultType from './../types/shot-result.types.js'

export const shootShip = (fleet, coordinates, boardDimensions) => {
  const boardPositionOfShot = convertCoordinatesToMatrixIndices(coordinates)

  if (boardPositionOfShot.rowIndex > boardDimensions.width - 1 || boardPositionOfShot.columnIndex > boardDimensions.height - 1) {
    return shotResultType.OUT_OF_BOUNDS
  }

  const ship = getShipForCoordinates(fleet, [coordinates])

  if (!ship) {
    return shotResultType.MISS
  }

  if (ship.destroyedSegments.some(s => s === coordinates)) {
    return shotResultType.ALREADY_HIT
  }

  ship.destroyedSegments.push(coordinates)

  if (ship.destroyedSegments.length === ship.coordinates.length) {
    ship.sunken = true
  }

  return shotResultType.HIT
}
