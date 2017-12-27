import React from "react"
import { Link, NavLink } from "react-router-dom"
import { connect } from "react-redux"

// components
import Btn from "../components/Btn"
import KikiLogoType from "../components/KikiLogoType"
import MenuTrigger from "../components/MenuTrigger"

class Menu extends React.Component{
  constructor(props){
    super(props)
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
    if (this.props.isScreenWidth.sm) {
      return (
        <div className="Menu sm">
          <div
            className="switch"
            onClick={this.toggleMobileMenu}
            >
            {/*<span><i className="far fa-sun"></i></span>*/}
            <MenuTrigger collapse={this.state.isShowMobileMenu} />
          </div>
          <div
            className={`container height100 ${this.state.isShowMobileMenu ? "show" : "hide"}`}
            onClick={this.toggleMobileMenu}
            >
            <KikiLogoType spin />
            <ul className="link-list">
              <li className="link-list-item"><NavLink exact to="/"><Btn><i className="fas fa-bug" />Home</Btn></NavLink></li>
              <li className="link-list-item"><NavLink exact to="/graffiti"><Btn><i className="fab fa-accusoft" />Graffiti</Btn></NavLink></li>
              <li className="link-list-item"><NavLink to="/website"><Btn><i className="fas fa-code" />WebSite</Btn></NavLink></li>
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div className="Menu md">
          <div className="container">
            <ul className="link-list">
              <li className="link-list-item"><NavLink exact to="/"><Btn><i className="fas fa-bug" />Home</Btn></NavLink></li>
              <li className="link-list-item"><NavLink exact to="/graffiti"><Btn><i className="fab fa-accusoft" />Graffiti</Btn></NavLink></li>
              <li className="link-list-item"><NavLink to="/website"><Btn><i className="fas fa-code" />WebSite</Btn></NavLink></li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

// export default Menu
const mapStateToProps = state => ({
  isScreenWidth: state.isScreenWidth,
  router: state.router, // <- 必須
  // ここで router を読み込まないと、react-router-transition が動作しない。
})
export default connect(mapStateToProps)(Menu)
