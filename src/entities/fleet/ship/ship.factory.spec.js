import orientationType from './../../../types/orientation.types';
import shipType from './../../../types/ship.types';
import { createShipFactoryFunction } from './ship.factory';

describe("createShip function", () => {
  const shipSizesMock = { DESTROYER: 5 };
  const mockCoordiantes = ["A1", "A2", "A3", "A4", "A5"];
  const getRandomOrientationMock = () => orientationType.HORIZONTAL;
  const getCoordinatesForNewShipMock = () => mockCoordiantes;
  const createShip = createShipFactoryFunction(getRandomOrientationMock, getCoordinatesForNewShipMock);

  test("it should create new ship", () => {
    const ship = createShip(shipSizesMock, [], {}, shipType.DESTROYER);

    expect(ship.type).toEqual(shipType.DESTROYER);
    expect(ship.coordinates).toEqual(mockCoordiantes);
    expect(ship.sunken).toBe(false);
    expect(ship.destroyedSegments).toHaveLength(0);
  });
});