
import { getRandomOrientation } from './../../../utils/random.utils.js';
import { getCoordinatesForNewShip } from './ship.factory.functions.js';

export const createShipFactoryFunction = (getRandomOrientation, getCoordinatesForNewShip) =>
  (shipSizes, existingShips, boardDimensions, shipType) => {
    const size = shipSizes[shipType];
    const orientation = getRandomOrientation();
    const coordinates = getCoordinatesForNewShip(existingShips, boardDimensions, size, orientation);

    return {
      type: shipType,
      coordinates,
      sunken: false,
      destroyedSegments: []
    };
  };

const createShip = createShipFactoryFunction(getRandomOrientation, getCoordinatesForNewShip);
export default createShip(getRandomOrientation, getCoordinatesForNewShip);