import React from 'react';
import {Flex, VStack, Button, Heading, Box, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { createCart } from '../services/CartService';

const CartView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartType, setCartType] = React.useState('');

  const handleCreateCart = async (type) => {
    setCartType(type);
    onOpen();

    const newCart = {
      type: type,
      items: [],
    };

    try {
      const createdCart = await createCart(newCart);
      console.log(`Carrito ${type} creado con éxito:`, createdCart);
    } catch (error) {
      console.error('Error al crear el carrito:', error);
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
      <VStack spacing={4}>
        <Heading as="h2" size="lg">Selecciona el tipo de carrito que deseas crear</Heading>
        <Button 
          onClick={() => handleCreateCart('COMUN')}
          bg="#ffab07"
          _hover={{ bg: "#e69b05" }}
          color="white"  
          size="lg" 
          w="100%">
          Carrito Común
        </Button>
        <Button 
          onClick={() => handleCreateCart('FECHA_ESPECIAL')}
          bg="#FF5733"
          _hover={{ bg: "#e74c3c" }}
          color="white" 
          size="lg" 
          w="100%">
          Carrito Promocionable por Fecha Especial
        </Button>
        <Button 
          onClick={() => handleCreateCart('VIP')}
          bg="#C70039"
          _hover={{ bg: "#a5002f" }}
          color="white" 
          size="lg" 
          w="100%">
          Carrito Promocionable por Usuario VIP
        </Button>
      </VStack>

      <Box mt={4}>
        <RouterLink to="/">
          <Button colorScheme="blue" size="lg">
            Volver al Inicio
          </Button>
        </RouterLink>
      </Box>

      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Carrito Creado
            </AlertDialogHeader>

            <AlertDialogBody>
              El carrito {cartType} se creó con éxito.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cerrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default CartView;

