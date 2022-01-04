"use strict";
const FILE_PATH = __dirname + "/../data/users.json";

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {   
    let userList = getUserListFromFile(FILE_PATH);
    userList.push({ username:this.email, email: this.email, password: this.password });
    saveUserListToFile(FILE_PATH, userList);
  }

  checkCredentials(email, password) {
    if (!email || !password) return false;
    let userFound = User.getUserFromList(email);
    console.log("User::checkCredentials:", userFound);
    if (!userFound) return false;
    return userFound.password === password;   
  }

  static get list() {   
    let userList = getUserListFromFile(FILE_PATH);
    return userList;
  }

  static isUser(username) {
    const userFound = User.getUserFromList(username);
    console.log("User::isUser:",userFound);
    return userFound!==undefined;   
  }

  static getUserFromList(username) {
    const userList = getUserListFromFile(FILE_PATH);
    for (let index = 0; index < userList.length; index++) {
      if (userList[index].username === username) return userList[index];
    }
    return;
  }


}

function getUserListFromFile(filePath) {
  const fs = require("fs");
  if (!fs.existsSync(filePath)) return [];
  let userListRawData = fs.readFileSync(filePath);
  let userList;
  if (userListRawData) userList = JSON.parse(userListRawData);
  else userList = [];
  return userList;
}

function saveUserListToFile(filePath, userList) {
  const fs = require("fs");
  let data = JSON.stringify(userList);
  fs.writeFileSync(filePath, data);
}



module.exports = User;
