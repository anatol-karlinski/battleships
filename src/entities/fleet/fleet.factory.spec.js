import shipType from './../../types/ship.types';
import jest from 'jest-mock';
import { createFleetFactoryFunction } from './fleet.factory';

describe("createFleet function", () => {

  const fleetConfig = {
    fleetComposition: {
      DESTROYER: 2,
      BATTLESHIP: 1
    },
    boardDimensions: {},
    shipSizes: {}
  };

  const shipsMock = [{
    type: shipType.DESTROYER,
    coordinates: ["A1", "A2", "A3", "A4"],
    sunken: false,
    destroyedSegments: []
  }, {
    type: shipType.DESTROYER,
    coordinates: ["B3", "B4", "B5", "B6"],
    sunken: false,
    destroyedSegments: []
  }, {
    type: shipType.BATTLESHIP,
    coordinates: ["D1", "E1", "F1", "G1", "H1"],
    sunken: false,
    destroyedSegments: []
  }];

  const createShipMock = jest.fn(() => shipsMock[createShipMock.mock.calls.length - 1]);
  const createFleet = createFleetFactoryFunction(createShipMock);

  test("it should create new fleet", () => {
    const fleet = createFleet(fleetConfig);

    expect(fleet).toHaveLength(3);
    fleet.forEach((ship, i) => {
      expect(ship).toEqual(shipsMock[i]);
    });
  });
});