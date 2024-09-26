import React from 'react';
import { Flex, Button, VStack, Heading, Image, Box } from '@chakra-ui/react';
import { FiShoppingCart, FiBox } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HomeView = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="center"
      minH="100vh"
      w="100%"
      p={8}
      bg="gray.50" >

      <VStack 
        align="center" 
        spacing={2}
        bg="gray.100" 
        p={6}
        borderRadius="md" 
        w={{ base: "100%", md: "40%" }} 
        maxW="400px"
        boxShadow="md">
        <Image 
          src="../src/assets/carrito.png" //imagen de carrito
          alt="Ilustración de carrito"
          boxSize="150px" />
        <Heading as="h2" size="lg">Carrito</Heading>
        <Button 
          as={Link}
          to="/create-cart" //enlace a vista
          leftIcon={<FiShoppingCart />} 
          bg="#ffab07" //color
          _hover={{ bg: "#DF9606" }}
          color="black"
          size="lg" 
          w="100%"
        > Crear Carrito
        </Button>
        <Button as={Link} 
          to="/carts" 
          leftIcon={<FiShoppingCart />} 
          variant="outline" 
          borderColor="#ffab07" 
          _hover={{ bg: "#FFD583", color: "black" }} 
          color="#ffab07" 
          size="lg" 
          w="100%">
          Ver Carritos Creados
        </Button>
      </VStack>

      <Box height="20px" />

      {/*Bloque de botones de productos */}
      <VStack 
        align="center" 
        spacing={2}
        bg="gray.100" 
        p={6}
        borderRadius="md" 
        w={{ base: "100%", md: "40%" }} 
        maxW="400px"
        boxShadow="md">
        <Image 
          src="../src/assets/caja-de-producto.png" //imagen de productos
          alt="Ilustración de productos"
          boxSize="150px"/>
        <Heading as="h2" size="lg">Productos</Heading>
        <Button as={Link} 
          to="/create-product" 
          leftIcon={<FiBox />} 
          bg="#064386"
          _hover={{ bg: "#032c3b" }}
          color="white"
          size="lg" 
          w="100%">
          Crear Producto
        </Button>
        <Button as={Link} 
          to="/products" 
          leftIcon={<FiBox />}  
          variant="outline" 
          borderColor="#064386"
          _hover={{ bg: "#638AB3", color: "white" }}
          color="#064386"
          size="lg" 
          w="100%">
          Listado de Productos
        </Button>
      </VStack>
    </Flex>
  );
};

export default HomeView;
