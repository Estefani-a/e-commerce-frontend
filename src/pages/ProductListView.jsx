import { useEffect, useState } from 'react';
import { Flex, VStack, Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Box, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../services/ProductService';

const ProductListView = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); //manejo de error

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
      setError(null);
      console.log(`Producto ${id} eliminado`);
    } catch (error) {
      setError('No se puede eliminar el producto porque está siendo utilizado en un carrito.');
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      w="100%"
      bg="gray.50"
      p={8}>
      <VStack spacing={4} w="full" maxW="800px">
        <Heading as="h2" size="lg">Listado de Productos</Heading>
        
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertTitle>Error al eliminar el producto!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
            {products.map(product => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>${product.price.toFixed(2)}</Td>
                <Td>
                  <RouterLink
                    to="/edit-product"
                    state={{ product }}
                    style={{ textDecoration: 'none' }} >
                    <Button colorScheme="blue" size="sm" mr={2}>
                      Editar
                    </Button>
                  </RouterLink>
                  <Button 
                    onClick={() => handleDelete(product.id)} 
                    colorScheme="red" 
                    size="sm">
                    Eliminar
                  </Button>
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

export default ProductListView;
