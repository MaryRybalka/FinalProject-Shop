import _ from 'lodash'

require('normalize.css/normalize.css')
require('../css/main.css')
let add_button = require('../img/add.png')

const id_hat = 'hat'
const id_cart = 'cart'
const id_milk = 'milk'
const id_grid = 'grid'
const id_menu = 'menu'
const id_title = 'title'
const id_articles = 'articles'
const id_container = 'container'
const id_cart_patch = 'cart-patch'
const id_main_page_inf = 'main-page-inf'
const id_article_for_w = 'article-for-w'
const id_article_for_m = 'article-for-m'
const class_item_active = 'item active'

const class_name = 'name'
const class_item = 'item'
const class_active = 'active'
const class_item_pic = 'item-pic'
const class_staff_inf = 'staff-inf'
const class_staff_inf_t = 'staff-inf-text'
const class_staff_inf_but = 'staff-inf-add'
const class_item_description = 'item-description'

function readJSONAndDraw (file, drawDataFn) {
  const request = new XMLHttpRequest()
  request.open('GET', file)
  // request.setRequestHeader('Access-Control-Allow-Origin', '*');
  request.send()

  request.onreadystatechange = function () {
    if (request.readyState !== 4) return
    if (request.status !== 200) {
      alert('Something wrong! Please check internet connection.')
    }
  }
  request.onload = function () {
    const items = JSON.parse(request.responseText)
    drawDataFn(items)
  }

  // console.log("start nest request");
  // const getCart = new XMLHttpRequest()
  // getCart.open('GET', 'http://95.154.71.136/final/demo/dogs_cart.json')
  // // request.setRequestHeader('Access-Control-Allow-Origin', '*');
  // getCart.send()
  //
  // getCart.onreadystatechange = function () {
  //   if (getCart.readyState !== 4) return
  //   if (getCart.status !== 200) {
  //     alert('Something wrong! Please check internet connection.')
  //   }
  // }
  // getCart.onload = function () {
  //   dog_collection.push(JSON.parse(getCart.responseText))
  // }
}

function drawDataDogs (data) {
  console.log(data)
  let counter = 0
  for (const item of data.items) {
    const product = document.createElement('div')
    product.className = class_item
    const picture = document.createElement('img')
    picture.src = require(`../${item.img}`)
    picture.className = class_item_pic
    const description_block = document.createElement('div')
    description_block.className = class_item_description
    const desc = document.createElement('span')
    desc.textContent = item.description
    const staff_inf = document.createElement('div')
    staff_inf.className = class_staff_inf
    // let staff_inf_text = document.createElement("div");
    // staff_inf_text.className = class_staff_inf_t;
    // let numb_of_items = document.createElement("span");
    // numb_of_items.textContent = item.numbers;

    if (item.numbers != 0) {
      const price = document.createElement('span')
      price.textContent = item.price + '$'
      const add_b = document.createElement('img')
      add_b.src = add_button
      add_b.className = class_staff_inf_but
      add_b.id = `${counter}`
      // staff_inf_text.appendChild(numb_of_items);
      // staff_inf_text.appendChild(price);
      // staff_inf.appendChild(staff_inf_text);
      staff_inf.appendChild(price)
      staff_inf.appendChild(add_b)

      counter++
    } else {
      product.style.opacity = '0.7'
      // product.style.pointerEvents = "none";
      // pointer-events: none;
    }
    description_block.appendChild(desc)
    description_block.appendChild(staff_inf)

    product.appendChild(picture)
    product.appendChild(description_block)

    document.getElementById(id_grid).appendChild(product)
  }

  document.getElementById(id_cart).onclick = function () {
    // let request = new XMLHttpRequest()
    // request.open('POST', 'http://95.154.71.136/final/demo/dogs_cart.json')
    // // request.setRequestHeader('Access-Control-Allow-Origin', '*');
    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // // request.setRequestHeader('Content-Type', 'application/json')
    // request.send(JSON.stringify(dog_collection))
    // // request.send();
    //
    // request.onreadystatechange = function () {
    //   if (request.readyState !== 4) return
    //   if (request.status !== 200) {
    //     alert('Something wrong! Please check internet connection.')
    //   }
    // }
    // request.onload = function ()
    // return window.open('cart.html', '_self')
    // }
    alert("you do not have access to the shopping cart because you are not registered in the system.");
    // return window.open('cart.html', '_self')
  }

  document.getElementById(id_grid).onclick = function (e) {
    if (_.isEqual(e.path[0].className, class_staff_inf_but)) {
      const image = e.path[3].childNodes[0].currentSrc
      const text = e.path[1].innerText
      document.getElementById(id_cart_patch).style.width = '7%'
      document.getElementById(id_cart_patch).style.height = '21%'
      document.getElementById(id_cart).style.transform = 'rotate(45deg)'
      setTimeout(function () {
        document.getElementById(id_cart).style.transform = 'rotate(0deg)'
        document.getElementById(id_cart_patch).style.width = '6%'
        document.getElementById(id_cart_patch).style.height = '20%'
      }, 250)//270
      setTimeout(function () { document.getElementById(id_cart).style.transform = 'rotate(315deg)'}, 150)//150
      setTimeout(function () { document.getElementById(id_cart).style.transform = 'rotate(22deg)'}, 100)
      setTimeout(function () { document.getElementById(id_cart).style.transform = 'rotate(335deg)'}, 50)
    }
  }
}

// if (document.getElementById(id_cart) != null)

readJSONAndDraw('http://95.154.71.136/final/demo/demo_dogs.json', drawDataDogs)
// readJSONAndDraw(demo_dogs, drawDataDogs)
