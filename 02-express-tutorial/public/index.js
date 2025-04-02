document.getElementById('load-products').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/v1/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();

    const container = document.getElementById('products-container');
    container.innerHTML = '<h2>Products List:</h2>';

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <img src="${product.image}" alt="${product.name}" width="200">
            <p>${product.desc}</p>
          `;
      container.appendChild(productDiv);
    });
  } catch (error) {
    document.getElementById(
      'products-container'
    ).innerHTML = `<p style="color: red;">Error loading products: ${error.message}</p>`;
  }
});
