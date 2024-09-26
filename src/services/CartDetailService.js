const CART_API_BASE_URL = 'http://localhost:8080';

//obtiene los productos del carrito por el id
export const getCartDetailsById = async (id) => {
  try {
    const response = await fetch(`${CART_API_BASE_URL}/detail/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los detalles del carrito');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los detalles del carrito", error);
    throw error;
  }
};

export const addProductToCart = async (cartId, productId) => {
  const formCartProduct = {
    cartId: cartId,
    productId: productId
  };

  try {
    const response = await fetch(`${CART_API_BASE_URL}/detail/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formCartProduct),
    });

    if (!response.ok) {
      throw new Error('Error al añadir el producto al carrito');
    }

    const updatedCart = await response.json();
    return updatedCart;
  } catch (error) {
    console.error('Error al añadir el producto al carrito:', error);
    throw error;
  }
};

export const removeProductFromCart = async (cartId, productId) => {
    try {
      const response = await fetch(`${CART_API_BASE_URL}/detail/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId, productId }),
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto del carrito');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar el producto del carrito", error);
      throw error;
    }
  };
  
export const buyCart = async (cartId) => {
    try {
      const formCartProduct = { cartId };
      const response = await fetch(`${CART_API_BASE_URL}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formCartProduct),
      });
  
      if (!response.ok) {
        throw new Error('Error al realizar la compra');
      }
  
      const updatedCart = await response.json();
      return updatedCart;
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      throw error;
    }
  };
  