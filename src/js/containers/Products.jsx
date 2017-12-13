import React from 'react'
import { Link, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from "react-redux"
// components
import Btn from '../components/Btn'
import NotFound from '../components/NotFound'
// modules
import action from "../modules/action"

const Products = (props) => (
  <div className="Products page">
    <h1>Products</h1>
    <ul>
      <li><Link to="/products/cyan"><Btn onClick={props.dispatchSelectItemCyan}>CYAN</Btn></Link></li>
      <li><Link to="/products/yellow"><Btn onClick={props.dispatchSelectItemYellow}>YELLOW</Btn></Link></li>
    </ul>
    <h2>pahtname: {props.route}</h2>
    <Switch>
      <Route exact path="/products" render={ () => props.selectedItem ? <Redirect to={`/products/${props.selectedItem}`} /> : <PleaseSelect/> } />
      <Route exact path="/products/cyan" component={Cyan} />
      <Route exact path="/products/yellow" component={Yellow} />
      <Route render={() => <Redirect to={`/products`} />} />
    </Switch>
  </div>
)

const PleaseSelect = ({isSelected}) => (
  <div>
    <h2>PleaseSelect...</h2>
  </div>
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

const mapStateToProps = state => ({selectedItem: state.selectedItem })
const mapDispatchToProps = dispatch => ({
  dispatchSelectItemCyan: () => dispatch(action.selectItem("cyan")),
  dispatchSelectItemYellow: () => dispatch(action.selectItem("yellow")),
})
export default connect(mapStateToProps, mapDispatchToProps)(Products)
