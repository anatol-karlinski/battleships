import createBaord from './board.factory';

describe("createBaord function", () => {
  const boardDimensionsMock = {
    width: 5,
    height: 10
  };

  test("it should create new board", () => {
    const board = createBaord(boardDimensionsMock);

    expect(board).toHaveLength(boardDimensionsMock.width);
    expect(board[0]).toHaveLength(boardDimensionsMock.height);
  });
});