const addDateTime = (message) => {
  const dateTimeNow = new Date();
  const date = dateTimeNow.toLocaleDateString(); // 17/08/2020
  const hour = dateTimeNow.toLocaleTimeString([], {timeStyle: 'short'}); // 13:26:15
  return date + " " + hour + " : " + message;
};
const MESSAGE = "best moment to watch this website !";
alert(addDateTime(MESSAGE));