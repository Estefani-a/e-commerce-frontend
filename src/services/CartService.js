const API_URL = 'http://localhost:8080/cart'; 

export const createCart = async (cartData) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error('Error creating the cart');
    }

    const newCart = await response.json();
    return newCart;
  } catch (error) {
    console.error('Failed to create cart:', error);
    throw error;
  }
};

//obtiene todos los carritos
export const getAllCarts = async () => {
  try {
    const response = await fetch(`${API_URL}/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching carts');
    }

    const carts = await response.json();
    return carts;
  } catch (error) {
    console.error('Failed to fetch carts:', error);
    throw error;
  }
};
//eliminar un carrito por id
export const deleteCartById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error eliminando el carrito');
    }

    return true;
  } catch (error) {
    console.error('Error al eliminar el carrito:', error);
    throw error;
  }
};

export const getCartById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/get/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching cart');
    }

    const cart = await response.json();
    return cart;
  } catch (error) {
    console.error('Failed to fetch cart by ID:', error);
    throw error;
  }
};