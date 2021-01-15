require('../css/main.css')
require('normalize.css/normalize.css')

import _ from 'lodash';

const id_cell_1 = "cell-1";
const id_cell_2 = "cell-2";
const id_cell_3 = "cell-3";
const id_cell_4 = "cell-4";
const id_cell_5 = "cell-5";
const id_cell_6 = "cell-6";
const id_cell_7 = "cell-7";
const id_cell_8 = "cell-8";
const id_cell_9 = "cell-9";
const id_row_1 = "row-1";
const id_row_2 = "row-2";
const id_row_3 = "row-3";
const id_field = "field";
const id_result = "result";
const id_background = "background";
const id_finger_1 = "finger-1";
const id_finger_2 = "finger-2";
const id_finger_3 = "finger-3";
const id_finger_4 = "finger-4";

var states = [];
var check = 0;

function endGame(){
  document.getElementById(id_field).style.display = "none";
  document.getElementById(id_result).style.display = "flex";
}

function setStartWindow() {
  for (let i = 0; i < 16; i++) {
    let new_finger = document.createElement("img");
    let cat = Math.ceil(Math.random() * 6 + 1);
    new_finger.src = require(`../img/cats/${cat}.jpg`);
    let ind = Math.ceil(Math.random() * 3 + 1);
    new_finger.id = `finger-${ind}`;
    switch(ind){
      case 1:
        states[i] = 0;
        break;
      case 2:
        states[i] = 90;
        break;
      case 3:
        states[i] = 180;
        break;
      case 4:
        states[i] = 270;
        break;
    }
    check = check + states[i];
    new_finger.setAttribute("alt", states[i]);
    document.getElementById(`cell-${i}`).setAttribute("accessKey", i)
    // console.log(ind);
    document.getElementById(`cell-${i}`).appendChild(new_finger);
  }
}

function setStartWindowFake() {
  for (let i = 0; i < 4; i++) {
    let new_finger = document.createElement("img");
    new_finger.src = require(`../img/cats/8.jpeg`);
    new_finger.id = "finger-4";
    states[i] = 270;
    check = check + states[i];
    new_finger.setAttribute("alt", states[i]);
    document.getElementById(`cell-${i}`).setAttribute("accessKey", i)
    // console.log(ind);
    document.getElementById(`cell-${i}`).appendChild(new_finger);
  }
  for (let i = 4; i < 16; i++) {
    let new_finger = document.createElement("img");
    new_finger.src = require(`../img/cats/8.jpeg`);
    if (_.isEqual(i, 7) || _.isEqual(i, 11) || _.isEqual(i, 15)){
      new_finger.id = "finger-4";
      states[i] = 270;
    } else {
      new_finger.id = "finger-1";
      states[i] = 0;
    }
    check = check + states[i];
    new_finger.setAttribute("alt", states[i]);
    document.getElementById(`cell-${i}`).setAttribute("accessKey", i)
    // console.log(ind);
    document.getElementById(`cell-${i}`).appendChild(new_finger);
  }
}

function startGame() {
  document.getElementById("field").onclick = function (e) {
    // console.log(e);
    let target_img = e.target.parentElement;
    let rotate = e.target.alt;
    // console.log(target_img);
    let i = target_img.accessKey;
    // console.log(i);
    let col_n = i%4;
    let row_n = Math.trunc(i/4);
    // console.log(col_n);
    for (let j = 0; j < 4; j++) {
      let cell = document.getElementById(`cell-${j + 4*(col_n)}`).childNodes[1];
      check = check - states[j + 4*row_n];
      states[j + 4*row_n] = (states[j + 4*row_n] + 90 > 270)? 0 : states[j + 4*row_n] + 90;
      check = check + states[j + 4*row_n];
      document.getElementById(`cell-${j + 4*(row_n)}`).childNodes[1].setAttribute("alt", states[j + 4*row_n]);
      document.getElementById(`cell-${j + 4*(row_n)}`).childNodes[1].style.transform = `rotate(${states[j + 4*row_n]}deg)`;

      if ((col_n + 4*j) != i){
        check = check - states[col_n + 4*j];
        states[col_n + 4*j] = (states[col_n + 4*j] + 90 > 270)? 0 : states[col_n + 4*j] + 90;
        check = check + states[col_n + 4*j];
        document.getElementById(`cell-${j + 4*(row_n)}`).childNodes[1].setAttribute("alt", states[col_n + 4*j]);
        document.getElementById(`cell-${col_n + 4*j}`).childNodes[1].style.transform = `rotate(${states[col_n + 4*j]}deg)`;
      }
    }
    console.log(check);
    if (_.isEqual(check, 0)) endGame();
  }
}

// setStartWindowFake(); //если лень протыкивать до конца самостоятельно)
setStartWindow();
startGame();
console.log("start");
