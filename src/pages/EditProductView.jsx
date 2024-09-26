import { useState } from 'react';
import { Flex, VStack, Input, Button, Heading, Box, Alert, AlertIcon } from '@chakra-ui/react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { updateProduct } from '../services/ProductService';

const EditProductView = () => {
  const location = useLocation();
  const { product } = location.state;

  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  
  //muestra la alert de exito
  const [successAlert, setSuccessAlert] = useState(false);

  const handleSave = async () => {
    const updatedProduct = { ...product, name: productName, price: parseFloat(productPrice) };

    try {
      await updateProduct(product.id, updatedProduct);

      //muestra alert de exito 3 segundos
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 3000);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert("No se pudo actualizar el producto.");
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
      <VStack spacing={4} w="full" maxW="400px">
        <Heading as="h2" size="lg">Editar Producto</Heading>
        <Input
          placeholder="Nombre del Producto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}/>
        <Input
          type="number"
          placeholder="Precio del Producto"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}/>
        <Button 
          onClick={handleSave}
          colorScheme="green" 
          size="lg"
          w="100%">
          Guardar Cambios
        </Button>

        {successAlert && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            El producto "{productName}" ha sido modificado con éxito.
          </Alert>
        )}
      </VStack>

      <Box mt={4}>
        <RouterLink to="/products">
          <Button colorScheme="blue" size="lg">
            Volver a Lista de Productos
          </Button>
        </RouterLink>
      </Box>
    </Flex>
  );
};

export default EditProductView;
