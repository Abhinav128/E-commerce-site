function generateStarRating(rating) {
    const maxRating = 5; 
    let starHtml = '';
  
    // Generate HTML for filled stars
    for (let i = 0; i < rating; i++) {
      starHtml += `
        <span>
          <svg>
            <use xlink:href="./images/sprite.svg#icon-star-full"></use>
          </svg>
        </span>
      `;
    }
  
    // Generate HTML for empty stars
    for (let i = rating; i < maxRating; i++) {
      starHtml += `
        <span>
          <svg>
            <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
          </svg>
        </span>
      `;
    }
  
    return starHtml;
  }
function fetchProducts() {
    return fetch('/home/product/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        return []; 
      });
  }

function renderProducts(products) {
    const productContainer = document.getElementById('productContainer');
  
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
  
      // Assuming product has properties like name, image, rating, price
      productElement.innerHTML = `
        <div class="product__header">
          <img src=${product.image} alt="">
          <span>
              <svg>
                  <use xlink:href="./images/sprite.svg#icon-camera"></use>
              </svg>
          </span>
        </div>
        <div class="product__footer">
          <h2>${product.productName}</h2>
          <div class="rating">
            ${generateStarRating(product.rating)}
          </div>
          <h4 class="price">$${product.cost}</h4>
        </div>
      `;
  
      // Append the product element to the container
      productContainer.appendChild(productElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts().then(renderProducts);
});

$(document).ready(function() {
  fetch('/home/isadmin')
  .then(response => response.json())
  .then(userData => {
      const menu = document.getElementById('menu');
      const addProductMenuItem = document.querySelector('.add-product');

      if (userData.admin) {
          // Create an "Add Product" link
          const addProductLink = document.createElement('a');
          addProductLink.href = '/home/product';
          addProductLink.textContent = 'Add Product';

          // Add the "Add Product" link to the menu
          const listItem = document.createElement('li');
          listItem.appendChild(addProductLink);
          menu.appendChild(listItem);
      }
  })
  .catch(error => {
      console.error('Error fetching user data:', error);
  });
 
});



  