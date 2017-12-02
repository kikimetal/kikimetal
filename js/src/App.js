import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import Btn from "./components/Btn"
import Maintenance from "./components/Maintenance"
import Home from "./Home"
import About from "./About"
import Products from "./Products"
import NotFound from "./NotFound"

export default class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <div className="grid">
          <Maintenance position="right" />
          <ul className="header">
            <h2>Header</h2>
            <li><Link to="/"><Btn>Home</Btn></Link></li>
            <li><Link to="/about"><Btn>About</Btn></Link></li>
            <li><Link to="/products"><Btn>Products</Btn></Link></li>
          </ul>
          <div className="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route path="/products" component={Products} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <div className="side">side</div>
          <div className="footer">footer</div>
        </div>
      </BrowserRouter>
    )
  }
}
