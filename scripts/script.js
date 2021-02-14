// Script.js

window.addEventListener('DOMContentLoaded', () => {
  let myStorage = window.localStorage;
  // fetch request to get data
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
      // store the list in localStorage
      let products = JSON.stringify(data);
      if (myStorage.getItem('productList') !== products) {
        myStorage.setItem('productList', products);
      }
      
      // create a product component for each item
      console.log(data, typeof(data));
      for (let id in data) {
        let item = data[id];
        let productItem = document.createElement('product-item');
        console.log(productItem);
        productItem.setAttribute('title', item['title']);
        productItem.setAttribute('price', item['price']);
        productItem.setAttribute('img', item['image']);
        
        console.log(productItem);
        //append to the product list
        document.getElementById('product-list').appendChild(productItem);
      }


    })
    .catch((error) => {console.log("Error: ", error);});

  
  // cart counting and toggle Add-Remove
  let itemCount = 0;
  document.querySelectorAll('button').forEach(function(btn) {
    btn.addEventListener('click', () => {
      console.log(btn.innerHTML);
      if (btn.innerHTML === 'Add to Cart') {
        itemCount++;
        //btn.innerHTML = 'Remove from Cart';
      }
      else {
        itemCount--;
        //btn.innerHTML = 'Add to Cart';
      }
      document.getElementById('cart-count').innerHTML = itemCount;
    });
  });


  // make sure cart is remembered
});