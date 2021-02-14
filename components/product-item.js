// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor (){
    super();

    // create a shadow root
    this.attachShadow({mode: 'open'});

    // create a <li> product element
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');

    // product image
    const productImg = document.createElement('img');
    productImg.setAttribute('width', '200');
    productImg.src = this.hasAttribute('img') ? this.getAttribute('img') : "dummy";
    wrapper.appendChild(productImg);

    // title
    const title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.textContent = this.getAttribute('title');
    wrapper.appendChild(title)

    // price
    const price = wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = this.getAttribute('price');
    wrapper.appendChild(price);

    // button
    const button = document.createElement('button');
    button.innerHTML = "Add to Cart";
    button.addEventListener('click', () => {
      button.innerHTML = (button.innerHTML === "Add to Cart") ? 'Remove from Cart' : "Add to Cart";
    });
    wrapper.appendChild(button);

    this.shadowRoot.append(wrapper);
  }
}

customElements.define('product-item', ProductItem);