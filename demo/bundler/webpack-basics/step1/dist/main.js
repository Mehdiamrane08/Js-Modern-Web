/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("\r\nconst stopStartSound = () => {\r\n    const myAudioPlayer = document.querySelector(\"#audioPlayer\");\r\n    \r\n    if( myAudioPlayer.paused)\r\n        myAudioPlayer.play();\r\n    else\r\n        myAudioPlayer.pause();\r\n}\r\n\r\nconst header = document.querySelector(\"header\");\r\n\r\nheader.addEventListener(\"click\",stopStartSound);\n\n//# sourceURL=webpack://step1/./src/index.js?");
/******/ })()
;