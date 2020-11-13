import { createNewShip } from './ship/ship.factory.js';

const createFleet = ({ fleetComposition, boardDimensions, shipSizes }) => {
  const typesOfShips = Object.keys(fleetComposition);

  return typesOfShips.reduce((allShips, shipType) => {
    const countOfShips = fleetComposition[shipType];
    const createdShipsOfType = [];

    for (let i = 0; i < countOfShips; i++) {
      createdShipsOfType.push(createNewShip(shipSizes, allShips, boardDimensions, shipType));
    }

    return allShips.concat(createdShipsOfType);
  }, []);
};

export default createFleet;