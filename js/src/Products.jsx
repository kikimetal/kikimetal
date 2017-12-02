import React from 'react'
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import Btn from './components/Btn'

const Products = () => (
  <div className="Products fade-in">
    <h1>Products</h1>
    <ul>
      <li><Link to="/products/cyan"><Btn>CYAN</Btn></Link></li>
      <li><Link to="/products/yellow"><Btn>YELLOW</Btn></Link></li>
    </ul>
    <Switch>
      <Route exact path="/products/cyan" component={Cyan} />
      <Route exact path="/products/yellow" component={Yellow} />
      <Route component={PleaseSelect} />
    </Switch>
  </div>
)

const PleaseSelect = () => (
  <h2>PleaseSelect...</h2>
)
const Cyan = () => (
  <div className="fade-in">
    <h2>Cyan...</h2>
    <p>cyan... cyan... cyan... cyan... cyan... </p>
  </div>
)
const Yellow = () => (
  <div className="fade-in">
    <h2>Yellow...</h2>
    <p>yellow... yellow... yellow... </p>
  </div>
)

export default Products
