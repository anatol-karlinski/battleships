import shotResultType from './../types/shot-result.types.js';

const convertIndexToAsciiChar = (index) => String.fromCharCode(65 + index);
const getCellSymbol = (cellValue) => {
  switch (cellValue) {
    case shotResultType.HIT:
      return "X";
    case shotResultType.MISS:
      return "O";
    default:
      return "*";
  }
};
const getRowNumber = (rowIndex) => (rowIndex + 1).toString().padEnd(2, ' ');
const getRowContent = (row) => row.map(getCellSymbol).join(" ");

export const renderEmptyLine = () => console.log();
export const getHeader = (boardWidth) => Array.from({ length: boardWidth }).fill(0).map((_, i) => convertIndexToAsciiChar(i)).join(' ');
export const getHeaderSeparator = (boardWidth) => Array.from({ length: boardWidth * 2 }).fill(0).map(() => "-").join("");
export const getRow = (row, rowIndex) => `${getRowNumber(rowIndex)}| ${getRowContent(row)} `;
