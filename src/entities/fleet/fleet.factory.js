import createShip from './ship/ship.factory.js';

export const createFleetFactoryFunction = (_createShip) => {
  return ({ fleetComposition, boardDimensions, shipSizes }) => {
    const typesOfShips = Object.keys(fleetComposition);

    return typesOfShips.reduce((allShips, shipType) => {
      const countOfShips = fleetComposition[shipType];
      const createdShipsOfType = [];

      for (let i = 0; i < countOfShips; i++) {
        createdShipsOfType.push(_createShip(shipSizes, allShips, boardDimensions, shipType));
      }

      return allShips.concat(createdShipsOfType);
    }, []);
  };
};

const createFleet = createFleetFactoryFunction(createShip);
export default createFleet;
