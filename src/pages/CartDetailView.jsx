import { useState, useEffect } from 'react';
import {Flex, VStack, Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Alert, AlertIcon} from '@chakra-ui/react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { getAllProducts } from '../services/ProductService';
import { getCartDetailsById, addProductToCart, removeProductFromCart, buyCart } from '../services/CartDetailService';

const CartDetailView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart;

  const [availableProducts, setAvailableProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [discounts, setDiscounts] = useState({ total: 0, discountAmount: 0 });
  const [discountDescription, setDiscountDescription] = useState('');

  useEffect(() => {
    if (!cart) {
      navigate('/carts');
      return;
    }

    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setAvailableProducts(products);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    const fetchCartProducts = async () => {
      try {
        const products = await getCartDetailsById(cart.id);
        setCartProducts(products);
        calculateDiscounts(products);
      } catch (error) {
        console.error('Error al cargar los productos del carrito:', error);
      }
    };

    fetchProducts();
    fetchCartProducts();
  }, [cart, navigate]);

  const calculateDiscounts = (products) => {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    let discountAmount = 0;
    let description = '';

    if (products.length === 4) {
      discountAmount = total * 0.25;
      description = 'Tienes un 25% de descuento por tener exactamente 4 productos!';
    } else if (cart.type === 'VIP' && products.length > 10) {
      discountAmount = total * 0.10;
      description = 'Tienes un 10% de descuento por ser un carrito VIP con más de 10 productos!';
    } else {
      description = 'No hay descuentos aplicables.';
    }

    setDiscounts({ total, discountAmount });
    setDiscountDescription(description);
  };

  const handleAddProduct = async (productId) => {
    try {
      const updatedCart = await addProductToCart(cart.id, productId);
      setCartProducts(updatedCart.products);
      calculateDiscounts(updatedCart.products);
    } catch (error) {
      console.error('Error al añadir el producto al carrito:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const updatedCart = await removeProductFromCart(cart.id, productId);
      setCartProducts(updatedCart.cart.products);
      calculateDiscounts(updatedCart.cart.products);
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleBuyCart = async () => {
    setErrorAlert(false);
    setSuccessAlert(false);

    if (cart.state === 'CERRADO') {
      setErrorAlert(true);
      return;
    }

    try {
      const updatedCart = await buyCart(cart.id); //llamado al servicio de compra
      setCartProducts(updatedCart.products);
      setSuccessAlert(true);
      navigate('/carts');
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Error al realizar la compra');
    }
  };

  const cartTotal = discounts.total;
  const finalTotal = cartTotal - discounts.discountAmount;

  return (
    <Flex direction="row" justify="space-between" minH="100vh" w="100%" bg="gray.50" p={8}>
      <VStack spacing={4} w="48%" align="start" bg="white" p={6} boxShadow="lg" borderRadius="md">
        <Heading as="h3" size="lg">Productos Disponibles</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Precio</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {availableProducts.map(product => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>${product.price.toFixed(2)}</Td>
                <Td>
                  <Button onClick={() => handleAddProduct(product.id)} colorScheme="green" size="sm">Agregar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <VStack spacing={4} w="48%" align="start" bg="white" p={6} boxShadow="lg" borderRadius="md">
        <Heading as="h2" size="lg">Detalles del Carrito</Heading>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>ID de Carrito</Th>
              <Td>{cart.id}</Td>
            </Tr>
            <Tr>
              <Th>Tipo de Carrito</Th>
              <Td>{cart.type}</Td>
            </Tr>
            <Tr>
              <Th>Total del Carrito</Th>
              <Td>${cartTotal.toFixed(2)}</Td>
            </Tr>
            <Tr>
              <Th>Descuento</Th>
              <Td>${discounts.discountAmount.toFixed(2)}</Td>
            </Tr>
            <Tr>
              <Th>Total Final</Th>
              <Td>${finalTotal.toFixed(2)}</Td>
            </Tr>
          </Tbody>
        </Table>

        {discountDescription && (
          <Alert status="info" mt={4}>
            <AlertIcon />
            {discountDescription}
          </Alert>
        )}

        {errorAlert && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            No se puede comprar porque el carrito está cerrado.
          </Alert>
        )}

        {successAlert && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            ¡Compra realizada exitosamente! El carrito se ha cerrado.
          </Alert>
        )}

        <Heading as="h3" size="md" mt={4}>Productos en el Carrito</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Precio</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartProducts.map(product => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>${product.price.toFixed(2)}</Td>
                <Td>
                  <Button onClick={() => handleDeleteProduct(product.id)} colorScheme="red" size="sm">Eliminar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Flex justify="space-between" w="100%" mt={4}>
          <Button colorScheme="blue" size="lg" onClick={handleBuyCart}>Comprar</Button>

          <RouterLink to="/carts">
            <Button colorScheme="gray" size="lg">Volver a Lista de Carritos</Button>
          </RouterLink>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default CartDetailView;
