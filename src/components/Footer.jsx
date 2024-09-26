import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" w="100%" p="4" bg="black" color="white" textAlign="center">
      <Text>&copy; {new Date().getFullYear()} E-Commerce. Todos los derechos reservados.</Text>
    </Box>
  );
};

export default Footer;
