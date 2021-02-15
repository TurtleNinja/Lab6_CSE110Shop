// Script.js
let myStorage = window.localStorage;
let itemsInCart = [];
let itemCount = 0;


/**
 * Load cart information from localStorage
 */
function loadCart() {
  if (myStorage.getItem('inCart')) {
    itemsInCart = myStorage.getItem('inCart').split(',');
  }
  else {
    myStorage.setItem('inCart', itemsInCart);
  }
  itemCount = itemsInCart.length;
  document.getElementById('cart-count').innerHTML = itemCount;
}

/**
 * 
 * @param {product-item} item 
 * When the button is clicked, 
 * If it is 'Add to Cart', increment the item count, push id to the cart array, and
 * switch label to 'Remove from Cart'
 * If it is 'Remove from Cart', decrement the item count, remove id to the cart array, and
 * switch label to 'Add to Cart'
 * 
 */

function addEventForButton(item) {
  let btn = item.shadowRoot.querySelector('button');
  btn.addEventListener('click', () => {
    let itemNum = btn.getAttribute('name');

    if (btn.innerHTML === 'Add to Cart') {
      // add new item to cart
      if (itemsInCart.indexOf(itemNum) === -1) {
        itemsInCart.push(itemNum);
        myStorage.setItem('inCart', itemsInCart);
        itemCount++;
      }
      // alert if item is already in cart
      else {
        alert('Item was already added');
      }
      // change button label
      btn.innerHTML = 'Remove from Cart';
    }
    else {
      itemCount--;
      // remove item from cart list
      itemsInCart.splice(itemsInCart.indexOf(itemNum), 1);
      myStorage.setItem('inCart', itemsInCart);
      // change button label
      btn.innerHTML = 'Add to Cart';
    }

    document.getElementById('cart-count').innerHTML = itemCount;
  });
}


window.addEventListener('DOMContentLoaded', () => {
  loadCart();

  // fetch request to get data
  fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {

      // store the product list in localStorage
      let products = JSON.stringify(data);
      if (myStorage.getItem('productList') !== products) {
        myStorage.setItem('productList', products);
      }
      
      // create a product component for each item
      for (let id in data) {
        let item = data[id];

        // create a product-item element
        let productItem = document.createElement('product-item');
        productItem.item = item;

        // add functionality for button
        addEventForButton(productItem);

        //append to the product list
        document.getElementById('product-list').appendChild(productItem);
      }
  })
  .catch((error) => {console.log("Error: ", error)}); // end fetching data
});