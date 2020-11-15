import createShip from './ship/ship.factory.js';

export const createFleetFactoryFunction = (_createShip) => {
  return ({ fleetComposition, boardDimensions, shipSizes }) => {
    const typesOfShips = Object.keys(fleetComposition);

    return typesOfShips.reduce((allShips, shipType) => {
      const countOfShips = fleetComposition[shipType];
      const allCreatedShips = [...allShips];

      for (let i = 0; i < countOfShips; i++) {
        allCreatedShips.push(_createShip(shipSizes, allCreatedShips, boardDimensions, shipType));
      }

      return allCreatedShips;
    }, []);
  };
};

const createFleet = createFleetFactoryFunction(createShip);
export default createFleet;
