/**
 * Provide a new 2D Array from an array of Objects, ordered as given in the dataPropertiesNeeded array
 * @param {Array} dataArrayOfObjects : array of objects to be transformed to 2D arrays
 * The objects should always have the same attributes, in the same order !
 * @param {Array} dataPropertiesNeeded : only convert a property to a column if either no array is given, or if it is specified in the array
 * Furthermore, the columns shall be given in the order given by the dataPropertiesNeeded
 * @returns {Array} new2Darray
 */
const transformArrayOfObjectsTo2DArray = (
  dataArrayOfObjects,
  dataPropertiesNeeded
) => {
  let new2DArray = dataArrayOfObjects.map((object) => {
    const allDataPropertiesValues = Object.values(object);
    const allDataPropertiesKeys = Object.keys(object);
    const requestedPropertiesValues = [];
    if (!dataPropertiesNeeded) return allDataPropertiesValues;
    dataPropertiesNeeded.forEach((key, index) => {
      const indexData = allDataPropertiesKeys.indexOf(key);
      if (indexData >= 0)
        requestedPropertiesValues.push(allDataPropertiesValues[indexData]);
    });
    return requestedPropertiesValues;
  });
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

/**
 * Add a column in a 2D array with an optional value for all cells
 * Use this function when there is no header in the table
 * @param {Array} dataArray : 2D array where a column is to be added
 * @param {Number} columnIndex : add the column next to this column index
 * @param {Number} valueForAllCells : optional data to be copied in all cells
 * @param {Function} getColumnCellValueFromRowData : optional function that will be called for each row of data passing the data row to the function
 */
const addColumnRightFromGivenIndex = (
  dataArray,
  columnIndex,
  valueForAllCells,
  getColumnCellValueFromRowData
) => {
  dataArray.forEach((row) => {
    // only add value if the check returns true
    let currentColumnCellValue;
    if (!valueForAllCells) {
      currentColumnCellValue = "";
      if (getColumnCellValueFromRowData)
        currentColumnCellValue = getColumnCellValueFromRowData(row);
    } else {
      currentColumnCellValue = valueForAllCells;
    }
    row.splice(columnIndex + 1, 0, currentColumnCellValue);
  });
};

/**
 * Add a property to an array of objects with an optional value for all objects
 * @param {Array} arrayOfObjects : array of objects where a property is to be added to all objects
 * @param {String} propertyName : add a new property with the given name
 * @param {String} valueForallObjects : optional data to be allocated to all objects' new property
 * @param {Function} getItemValueFromObject : optional function that will be applied on each object to determine the value of each object new property
 * */
const addPropertyWithDataToAllObjects = (
  arrayOfObjects,
  propertyName,
  valueForallObjects,
  getItemValueFromObject
) => {
  arrayOfObjects.forEach((element,index) => {
    // only add value if the check returns true
    let currentValueForObjectNewProperty;
    if (!valueForallObjects) {
      currentValueForObjectNewProperty = "";
      if (getItemValueFromObject)
        currentValueForObjectNewProperty = getItemValueFromObject(element, index);
    } else {
      currentValueForObjectNewProperty = valueForallObjects;
    }
    //const safePropertyName = propertyName.toLowerCase().replace(/\s/g, "");
    element[propertyName] = currentValueForObjectNewProperty;
  });
};

/**
 * Update a property for all objects of an array based on the application of the getItemValueFromObject() function
 * @param {Array} arrayOfObjects : array of objects where a property is to be modified for all objects
 * @param {String} propertyName : update the property of the objects called propertyName
 * @param {Function} setItemValueFromObject : function that will be applied on each object to set the value of each object property
 * */
const updatePropertyWithDataToAllObjects = (
  arrayOfObjects,
  propertyName,
  setItemValueFromObject
) => {
  if (!setItemValueFromObject)
    // nothing to be done
    return arrayOfObjects;
  arrayOfObjects.forEach((element) => {
    setItemValueFromObject(propertyName, element);
  });
};

/**
 * Check if a 2D array contains a given value in a given column
 * @param {Array of Array} array2D
 * @param {Number} columnIndex
 * @param {String} value
 */
const array2DContains = (array2D, columnIndex, value) => {
  if (!array2D || !columnIndex || !value) return false;
  for (let index = 0; index < array2D.length; index++) {
    //if(!Array.isArray(row[columnIndex]) || row[columnIndex].length === 0) return false;
    if (array2D[index][columnIndex].includes(value)) return true;
  }
  return false;
};

/**
 * Function that transposes a 2D arrays (from columns to rows)
 * @param {Array} arrayToTranspose : 2D array of data that shall be transposed from columns to rows. This is immutable.
 * @returns {Array} transposed : returns the transpposed array
 */
const transpose2DArray = (arrayToTranspose) => {
  const transposed = arrayToTranspose[0].map((oldCol, oldColIndex) =>
    arrayToTranspose.map((oldCol) => oldCol[oldColIndex])
  );
  return transposed;
};

/**
 * This functions transpose an array of values, represented by the rowConfiguration.verticalHeaders, to an array of objects
 * Each property given in the rowConfiguration.verticalHeaders will be used to create an array of objects containing one property.
 * For each object passed to the function, one property will be added to each object.
 * @param {Array} columnConfiguration : each object property - in order to become a column -
 * is to be configured based on a object such as { dataKey: "_id", columnTitle: "Id", hidden: true }.
 * Render the columns in the order of the objects given in columnConfiguration, when dataKey value is found on an object.
 * Discard the rendering of dataArray object properties not given in a dataKey of columnConfiguration.
 * Only display requested columns where hidden is false.
 * If undefined, display all columns. Get the column header name based on the columnTitle. If no columnTitle, the columnTitle is
 * considered as being the dataKey.
 * @param {Array} rowConfiguration : rowConfiguration.hiddenDataAttributes : add data attributes to each table row, except for the header. An index is always added as data-index.
 * If no rowConfiguration.hiddenDataAttributes , don't add extra data attributes, else add all values in table row for each column corresponding to a key.
 * Format of the name for the data-attribute : data-hiddenDataAttributes[i].
 * rowConfiguration.isHeaderRowHidden : deal if the header row shall be hidden
 * rowConfiguration.verticalHeaders : an array to describe all the expected vertical headers
 * @param  {...any} objects : each object that you pass will add a property to all the objects in the array.
 * Therefore, the object will be transposed from an object to multiple properties to the array made by the vertical header
 */
const createArrayOfObjects = (
  rowConfiguration,
  columnConfiguration,
  ...objects
) => {
  if (
    !rowConfiguration ||
    !rowConfiguration.verticalHeaders ||
    rowConfiguration.verticalHeaders.length === 0 ||
    !columnConfiguration ||
    columnConfiguration.length === 0
  )
    return;
  const newArray = [];
  rowConfiguration.verticalHeaders.forEach((rowConf) => {
    const newObject = {};

    objects.forEach((object, index) => {
      // deal with the vertical header
      let oldObjectKey = rowConf.dataKey;
      let newObjectKey = columnConfiguration[index].dataKey;
      if (index === 0) newObject[newObjectKey] = rowConf.rowTitle;
      // deal with the other vertical values
      newObjectKey = columnConfiguration[index + 1].dataKey;
      newObject[newObjectKey] = object[oldObjectKey];
    });
    newArray.push(newObject);
  });
  return newArray;
};

export {
  addRowAtIndex,
  deleteColumnFrom2DArray,
  transformArrayOfObjectsTo2DArray,
  addColumnRightFromGivenIndex,
  array2DContains,
  transpose2DArray,
  addPropertyWithDataToAllObjects,
  createArrayOfObjects,
  updatePropertyWithDataToAllObjects,
};
