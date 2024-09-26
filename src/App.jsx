
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeView from './pages/homeView';
import CreateCartView from './pages/CartView';
import CartListView from './pages/CartListView';
import CreateProductView from './pages/CreateProductView';
import ProductListView from './pages/ProductListView';
import EditProductView from './pages/EditProductView';
import CartDetailView from './pages/CartDetailView';
import Footer from './components/Footer';

const theme = extendTheme({});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomeView />} />
          <Route path="/create-cart" element={<CreateCartView />} />
          <Route path="/carts" element={<CartListView />} />
          <Route path="/create-product" element={<CreateProductView />} />
          <Route path="/products" element={<ProductListView />} />
          <Route path="/edit-product" element={<EditProductView />} />
          <Route path="/cart/:id" element={<CartDetailView />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;


