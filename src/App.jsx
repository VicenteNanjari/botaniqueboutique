
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Gallery from './views/Gallery.jsx'

function App() {
  return(
    <Router>
      <Header />
      <Gallery />
      <Footer />
    </Router>
  )
}

export default App
