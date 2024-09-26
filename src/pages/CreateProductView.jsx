import { useState } from 'react';
import { Flex, VStack, Button, Input, Heading, Box, Text, useToast } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { createProduct } from '../services/ProductService';

const CreateProductView = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [products, setProducts] = useState([]);
  const toast = useToast();

  const handleAddProduct = async () => {
    if (productName.trim() === '' || productPrice <= 0) {
      alert('Por favor, ingresa un nombre y un precio válido.');
      return;
    }

    const newProduct = {
      name: productName,
      price: parseFloat(productPrice).toFixed(2),
    };

    try {
      const savedProduct = await createProduct(newProduct);
      setProducts([...products, savedProduct]);
      setProductName('');
      setProductPrice('');

      toast({
        title: `Producto ${savedProduct.name} creado con éxito!`,
        status: 'success',
        duration: 3000,
        isClosable: false,
      });
    } catch (error) {
      toast({
        title: 'Error al crear el producto',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
      p={8} >
      <VStack spacing={4} w="full" maxW="400px">
        <Heading as="h2" size="lg">Crear Nuevo Producto</Heading>
        <Input
          placeholder="Nombre del Producto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)} />
        <Input
          type="number"
          placeholder="Precio del Producto"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)} />
        <Button 
          onClick={handleAddProduct}
          bg="#ffab07"
          _hover={{ bg: "#e69b05" }}
          color="black"
          size="lg"
          w="100%" >
          Agregar Producto
        </Button>
      </VStack>

      <Box mt={8} w="full" maxW="400px">
        <Heading as="h3" size="md" mb={4}>Productos Creados</Heading>
        {products.length > 0 ? (
          products.map(product => (
            <Text key={product.id}>
              {product.name} - ${product.price}
            </Text>
          ))
        ) : (
          <Text>No hay productos creados aún.</Text>
        )}
      </Box>

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

export default CreateProductView;

