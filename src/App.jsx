
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './views/Home.jsx'

function App() {
  return(
    <Router>
      <Header />
      <Home />
      <Footer />
    </Router>
  )
}

export default App
