import _ from 'lodash';

require('normalize.css/normalize.css');
require('../css/main.css');
let add_button = require('../img/add.png');

const class_item_active = "item active";
const id_cart = "cart"
const id_container = "container"
const id_menu = "menu"
const id_hat = "hat"
const id_title = "title"
const id_cart_patch = "cart-patch"
const id_main_page_inf = "main-page-inf"
const id_articles = "articles"
const id_milk = "milk"
const id_article_for_w = "article-for-w"
const id_article_for_m = "article-for-m"
const id_grid = "grid"

const class_active = "active"
const class_name = "name"
const class_item = "item"
const class_item_pic = "item-pic"
const class_item_description = "item-description"
const class_staff_inf = "staff-inf"
const class_staff_inf_t = "staff-inf-text"
const class_staff_inf_but = "staff-inf-add"


function readJSONAndDraw(file, drawDataFn) {
  let request = new XMLHttpRequest();
  request.open('GET', file);
  // request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.send();

  request.onreadystatechange = function () {
    if (!_.isEqual(request.readyState, 4)) return;
    if (!_.isEqual(request.status, 200)) {
      alert("Something wrong! Please check internet connection.");
    }
  }
  request.onload = function () {
    const items = JSON.parse(request.responseText);
    console.log(items);
    drawDataFn(items);
  }
}

function drawDataCats(data) {
  // console.log(data);
  let counter = 0
  for (let item of data.items) {
    let product = document.createElement("div");
    product.className = class_item;
    let picture = document.createElement("img");
    // picture.src = "http://95.154.71.136/final2/" + item.img;
    picture.src = require(`../${item.img}`);
    picture.className = class_item_pic;
    let description_block = document.createElement("div");
    description_block.className = class_item_description;
    let desc = document.createElement("span");
    desc.textContent = item.description;
    let staff_inf = document.createElement("div");
    staff_inf.className = class_staff_inf;

    if (!_.isEqual(item.numbers, 0)){
      let price = document.createElement("span");
      price.textContent = item.price + "$";
      let add_b = document.createElement("img");
      add_b.src = add_button;
      add_b.className = class_staff_inf_but;
      add_b.id = `${counter}`
      staff_inf.appendChild(price);
      staff_inf.appendChild(add_b);
      counter++
    }
    else product.style.opacity = "0.7";
    description_block.appendChild(desc);
    description_block.appendChild(staff_inf);

    product.appendChild(picture);
    product.appendChild(description_block);

    document.getElementById(id_grid).appendChild(product);
    console.log("done");
  }

  document.getElementById(id_cart).onclick = function () {
    // let request = new XMLHttpRequest()
    // request.open('POST', 'http://95.154.71.136/final/demo/cat_cart.json')
    // // request.setRequestHeader('Access-Control-Allow-Origin', '*');
    // request.setRequestHeader('Content-Type', 'application/json')
    // request.send(JSON.stringify(cat_collection))
    // // request.send();
    //
    // request.onreadystatechange = function () {
    //   if (request.readyState !== 4) return
    //   if (request.status !== 200) {
    //     alert('Something wrong! Please check internet connection.')
    //   }
    // }
    // request.onload = function () {
    //   return window.open('cart.html', '_self')
    alert("you do not have access to the shopping cart because you are not registered in the system.");
    // }
  }

  document.getElementById(id_grid).onclick = function (e) {
    if (_.isEqual(e.path[0].className, class_staff_inf_but)){
      const image = e.path[3].childNodes[0].currentSrc;
      const text = e.path[1].innerText;
      document.getElementById(id_cart_patch).style.width = '7%';
      document.getElementById(id_cart_patch).style.height = '21%';
      document.getElementById(id_cart).style.transform = 'rotate(45deg)';
      setTimeout(function () {
        document.getElementById(id_cart).style.transform = 'rotate(0deg)';
        document.getElementById(id_cart_patch).style.width = '6%';
        document.getElementById(id_cart_patch).style.height = '20%';
      }, 250)//270
      setTimeout(function () { document.getElementById(id_cart).style.transform = 'rotate(315deg)'}, 150);//150
      setTimeout(function () { document.getElementById(id_cart).style.transform = 'rotate(22deg)'}, 100);
      setTimeout(function () { document.getElementById(id_cart).style.transform = 'rotate(335deg)'}, 50);
    }
  }
}

readJSONAndDraw('http://95.154.71.136/final/demo/demo_cat.json', drawDataCats);
