import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Gallery from './views/Gallery.jsx'
import Register from './views/Register.jsx'
import Login from './views/Login.jsx'
//import PublicationForm from './views/PublicationForm.jsx'
import PerfilUsuario from './views/Profile.jsx'
import ProductDetail from './views/Product.jsx'
import CarritoDeCompras from './views/Cart.jsx'
import Home from './views/Home.jsx'
import ThankYouPage from './views/ThankYouPage.jsx'
import SubirProducto from './views/UploadProduct.jsx'
// import EditarPerfil from './views/EditarPerfil.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios/:userId" element={<PerfilUsuario />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<CarritoDeCompras />} />
        <Route path="/thankyoupage" element={<ThankYouPage />} />
        <Route path="/subir-producto" element={<SubirProducto />} />
        {/* <Route path="/editar-perfil/:userId" element={<EditarPerfil />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App

