import React from "react"
import { Link, NavLink } from "react-router-dom"
// components
import Btn from "./Btn"
import KikiStar from "./KikiStar"

const Nav = () => (
  <div className="Nav">
    <h2><KikiStar /> KIKIMETAL HEADER <i className="fas fa-circle-notch fa-lg fa-spin"></i></h2>
    <ul>
      <li><NavLink exact to="/"><Btn>Home</Btn></NavLink></li>
      <li><NavLink exact to="/about"><Btn>About</Btn></NavLink></li>
      <li><NavLink exact to="/products"><Btn>Products</Btn></NavLink></li>
    </ul>
  </div>
)

export default Nav
