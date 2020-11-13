export const gameIsOver = fleet => fleet.every(ship => ship.sunken);
export const shipIsDestroyed = ship => ship.destroyedSegments.length === ship.coordinates.length;
