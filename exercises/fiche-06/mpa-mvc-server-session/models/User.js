"use strict";

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {
    let userList = initConnectionToUserList();
    userList.push({ username:this.email, email: this.email, password: this.password });
  }

  checkCredentials(email, password) {
    if (!email || !password) return false;
    let userFound = User.getUserFromList(email);
    console.log("User::checkCredentials:", userFound);
    if (!userFound) return false;
    return userFound.password === password;    
  }

  static get list() {
    const userList = initConnectionToUserList();
    return userList;
  }

  static isUser(username) {
    let userFound = User.getUserFromList(username);
    console.log("User::isUser:",userFound);
    return userFound!==undefined;
  }

  static getUserFromList(username) {
    const userList = initConnectionToUserList();
    for (let index = 0; index < userList.length; index++) {
      if (userList[index].username === username) return userList[index];
    }
    return;
  }
}

function initConnectionToUserList() {
  let app = require("../app.js");
  if (!app.locals.userList) app.locals.userList = [];
  return app.locals.userList;
}

module.exports = User;
