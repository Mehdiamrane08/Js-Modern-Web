const loadFromSessionStorage = (key) => {
  const serializedObject = sessionStorage.getItem(key);
  if (serializedObject) return JSON.parse(serializedObject);
  else return "";
};

const saveToSessionStorage = (key, data) => {
  const serializedObject = JSON.stringify(data);
  sessionStorage.setItem(key, serializedObject);
};

export { loadFromSessionStorage, saveToSessionStorage };
