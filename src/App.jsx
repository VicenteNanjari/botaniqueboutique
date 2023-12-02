
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header.jsx'
import Banner from './components/Banner.jsx'
import Footer from './components/Footer.jsx'
import Home from './views/Home.jsx'
import Register from './views/Register.jsx'
import Login from './views/Login.jsx'
import Gallery from './views/Gallery.jsx'

function App() {
  return(
    <Router>
        <div>
          <Header>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
          </Header>
      </div>
      <Banner/>
      <Footer />
    </Router>
  )
}

export default App

