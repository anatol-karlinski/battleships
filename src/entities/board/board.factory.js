export default (boardDimensions) => [...Array(boardDimensions.width)].map(() => Array(boardDimensions.height).fill(0));
