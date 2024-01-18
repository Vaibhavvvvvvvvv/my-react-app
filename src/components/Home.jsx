import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const products = [
    { id: 1, name: 'Product 1', price: 20, imageUrl: 'https://th.bing.com/th/id/OIP.rnInqOxNl-EJO51-2VfBAQHaHa?rs=1&pid=ImgDetMain' },
    { id: 2, name: 'Product 2', price: 30, imageUrl: 'https://th.bing.com/th/id/OIP.rnInqOxNl-EJO51-2VfBAQHaHa?rs=1&pid=ImgDetMain' },
    { id: 3, name: 'Product 3', price: 25, imageUrl: 'https://th.bing.com/th/id/OIP.rnInqOxNl-EJO51-2VfBAQHaHa?rs=1&pid=ImgDetMain' },
  ];

  const addProductToCart = (product) => {
    const updatedCart = [...cart, product];
    const updatedTotal = total + product.price;
    setCart(updatedCart);
    setTotal(updatedTotal);
  };

  const removeProductFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    const removedProduct = cart.find((item) => item.id === productId);
    const updatedTotal = total - (removedProduct ? removedProduct.price : 0);
    setCart(updatedCart);
    setTotal(updatedTotal);
  };

  return (
    <div>
      <h2>Home</h2>

      {products.map((product) => (
        <div key={product.id}>
          <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
          <Typography variant="body1" align="center" gutterBottom>
            {product.name} - ${product.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addProductToCart(product)}
          >
            Add to Cart
          </Button>
          <br />
          <br />
        </div>
      ))}

      <div>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Cart:
        </Typography>
        {cart.map((item) => (
          <div key={item.id}>
            <Typography variant="body1" align="center">
              {item.name} - ${item.price}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeProductFromCart(item.id)}
                style={{ marginLeft: '10px' }}
              >
                Remove
              </Button>
            </Typography>
          </div>
        ))}
        <Typography variant="h6" align="center" gutterBottom>
          Total: ${total}
        </Typography>
      </div>
    </div>
  );
};
export default Home;
