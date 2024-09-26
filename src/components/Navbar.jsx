import { HStack, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    return (
      <HStack as="nav" w="100%" p="4" shadow="md" bg="black" color="white">
        <Flex align="center" justify="center" w="100%" maxW="1200px"> 
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <Text fontSize="lg" color="white" ml={4}>Inicio</Text>
          </RouterLink>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" flexGrow={1}>
            E-Commerce Challenge
          </Text>
        </Flex>
      </HStack>
    );
};

export default Navbar;
