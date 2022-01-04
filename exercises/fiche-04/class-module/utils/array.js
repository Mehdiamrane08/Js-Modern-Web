/**
 * Provide a new 2D Array from an array of Objects
 * @param {Array} dataArrayOfObjects : array of objects to be transformed to 2D arrays
 * The objects should always have the same attributes, in the same order !
 * @returns {Array} new2Darray
 */
const transformArrayOfObjectsTo2DArray = (dataArrayOfObjects) => {
  let new2DArray = dataArrayOfObjects.map((object) => Object.values(object));
  return new2DArray;
};
/**
 * Update dataArray by adding a row
 * @param {Array} dataArray : 2D array where a row is to be added
 * @param {Array} newDataRow : new row to be added
 * @param {Number} startIndex : index where to add the new row
 */
const addRowAtIndex = (dataArray, newDataRow, startIndex) => {
  dataArray.splice(startIndex, 0, newDataRow);
};

/**
 * Delete a column in a 2D array
 * @param {Array} dataArray : 2D where a row is to be deleted
 * @param {Number} columnIndex : index of the column to be deleted
 */
const deleteColumnFrom2DArray = (dataArray, columnIndex) => {
  dataArray.forEach((row) => row.splice(columnIndex, 1));
};

export {
  addRowAtIndex,
  deleteColumnFrom2DArray,
  transformArrayOfObjectsTo2DArray,
};
