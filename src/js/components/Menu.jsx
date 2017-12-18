import React from "react"
import { Link, NavLink } from "react-router-dom"
// components
import Btn from "./Btn"

class Menu extends React.Component{
  constructor(){
    super()
    this.state = {
      isShowMobileMenu: false,
    }
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }
  toggleMobileMenu(){
    this.setState({
      isShowMobileMenu: !this.state.isShowMobileMenu
    })
  }
  render(){
    if (this.props.mobile) {
      return (
        <div className="Menu mobile">
          <div
            className="switch"
            onClick={this.toggleMobileMenu}
            >
            <Btn>menu toggler</Btn>
          </div>
          <ul
            className={`container ${this.state.isShowMobileMenu ? "show" : "hide"}`}
            onClick={this.toggleMobileMenu}
            >
            <li><NavLink exact to="/"><Btn><i className="fas fa-bug" />Home</Btn></NavLink></li>
            <li><NavLink exact to="/about"><Btn><i className="fas fa-bomb" />About</Btn></NavLink></li>
            <li><NavLink to="/products"><Btn><i className="fas fa-bolt" />Products</Btn></NavLink></li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className="Menu">
          <h2>menu</h2>
          <ul>
            <li><NavLink exact to="/"><Btn><i className="fas fa-bug" />Home</Btn></NavLink></li>
            <li><NavLink exact to="/about"><Btn><i className="fas fa-bomb" />About</Btn></NavLink></li>
            <li><NavLink to="/products"><Btn><i className="fas fa-bolt" />Products</Btn></NavLink></li>
          </ul>
        </div>
      )
    }
  }
}

Menu.defaultProps = {
  mobile: false,
}

export default Menu
