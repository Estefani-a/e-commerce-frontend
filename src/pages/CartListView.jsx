import { useState, useEffect } from 'react';
import { Flex, VStack, Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Box, HStack } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getAllCarts, deleteCartById } from '../services/CartService';

const CartListView = () => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const fetchedCarts = await getAllCarts();
        setCarts(fetchedCarts);
      } catch (error) {
        console.error('Error al cargar los carritos:', error);
      }
    };

    fetchCarts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCartById(id);
      setCarts(carts.filter(cart => cart.id !== id));
      console.log(`Carrito ${id} eliminado`);
    } catch (error) {
      console.error('Error al eliminar el carrito:', error);
    }
  };

  const handleSelect = (id) => {
    const selectedCart = carts.find(cart => cart.id === id);
    navigate(`/cart/${id}`, { state: { cart: selectedCart } });
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      w="100%"
      bg="gray.50"
      p={8} >
      <VStack spacing={4} w="full" maxW="800px">
        <Heading as="h2" size="lg">Lista de Carritos Creados</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tipo de Carrito</Th>
              <Th>Estado</Th>
              <Th>Monto Total</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {carts.map(cart => (
              <Tr key={cart.id}>
                <Td>{cart.id}</Td>
                <Td>{cart.type}</Td>
                <Td>{cart.state}</Td>
                <Td>${cart.products.length > 0 ? cart.products[0].price.toFixed(2) : '0.00'}</Td>
                <Td>
                  <HStack spacing={4}>
                    <Button 
                      onClick={() => handleSelect(cart.id)} 
                      colorScheme="blue" 
                      size="sm" >
                      Ver carrito
                    </Button>
                    <Button 
                      onClick={() => handleDelete(cart.id)} 
                      colorScheme="red" 
                      size="sm" >
                      Eliminar
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Box mt={4}>
        <RouterLink to="/">
          <Button colorScheme="blue" size="lg">
            Volver al Inicio
          </Button>
        </RouterLink>
      </Box>
    </Flex>
  );
};

export default CartListView;
