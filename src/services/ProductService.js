const API_URL = 'http://localhost:8080/products';

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }

    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
};

//trae todos los productos
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/get`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

//metodo para eliminar un producto
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
};
//esto es para editar un producto determinado
export const updateProduct = async (id, productData) => {
  try {
      const response = await fetch(`${API_URL}/update/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData || 'Error al actualizar el producto');
      }

      const updatedProduct = await response.json();
      return updatedProduct;
  } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
  }
};


