
import { getRandomOrientation } from './../../../utils/random.utils.js';
import { getCoordinatesForNewShip } from './ship.factory.functions.js';

export const createShipFactoryFunction = (_getRandomOrientation, _getCoordinatesForNewShip) =>
  (shipSizes, existingShips, boardDimensions, shipType) => {
    const size = shipSizes[shipType];
    const orientation = _getRandomOrientation();
    const coordinates = _getCoordinatesForNewShip(existingShips, boardDimensions, size, orientation);

    return {
      type: shipType,
      coordinates,
      sunken: false,
      destroyedSegments: []
    };
  };

const createShip = createShipFactoryFunction(getRandomOrientation, getCoordinatesForNewShip);
export default createShip;