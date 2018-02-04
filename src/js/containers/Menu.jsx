import React from "react"
import { Link, NavLink } from "react-router-dom"
import { connect } from "react-redux"

// components
import Btn from "../components/Btn"
import KikiLogoType from "../components/KikiLogoType"
import MenuTrigger from "../components/MenuTrigger"
import HeightTransitionToFull from "../components/HeightTransitionToFull"

class Menu extends React.Component{
  constructor(props){
    super(props)
    this.state = { isShowMobileMenu: false }
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }
  toggleMobileMenu(){
    this.setState({ isShowMobileMenu: !this.state.isShowMobileMenu })
  }
  render(){
    if (this.props.windowSize === "sm") { // sm
      return (
        <div className="Menu sm">

          <div className="menu-switch" onClick={this.toggleMobileMenu}>
            <MenuTrigger collapse={this.state.isShowMobileMenu} />
          </div>

          {
            this.props.router.location.pathname === "/website" &&
            <div className="sort-switch">
              <Btn onClick={this.props.reverseWebsite}><i className="fas fa-bug" />{this.props.isReverseWebsite ? "古い" : "新しい"}順にする</Btn>
            </div>
          }

          <HeightTransitionToFull
            className={`container ${this.state.isShowMobileMenu ? "show" : "hide"}`}
            onClick={this.toggleMobileMenu}
            >
            <KikiLogoType spin />
            <ul className="link-list">
              <li className="link-list-item"><NavLink exact to="/"><Btn><i className="fas fa-bug" />Home</Btn></NavLink></li>
              <li className="link-list-item"><NavLink exact to="/graffiti"><Btn><i className="fab fa-accusoft" />Graffiti</Btn></NavLink></li>
              <li className="link-list-item"><NavLink to="/website"><Btn><i className="fas fa-code" />WebSite</Btn></NavLink></li>
            </ul>
          </HeightTransitionToFull>
        </div>
      )
    } else { // over md
      return (
        <div className="Menu md">
          <div className="container">

            {
              this.props.router.location.pathname === "/website" &&
              <div className="sort-switch">
                <Btn onClick={this.props.reverseWebsite}><i className="fas fa-bug" />{this.props.isReverseWebsite ? "古い" : "新しい"}順にする</Btn>
              </div>
            }

            <ul className="link-list">
              {/*{
                this.props.router.location.pathname === "/website" &&
                <li className="link-list-item"><Btn onClick={this.props.reverseWebsite}><i className="fas fa-bug" />{this.props.isReverseWebsite ? "古い" : "新しい"}順にする</Btn></li>
              }*/}
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
  windowSize: state.windowSize,
  isReverseWebsite: state.isReverseWebsite,
  router: state.router, // <- 必須 ここで router を読み込まないと、react-router-transition が動作しない。
})

import * as action from "../modules/action"
const mapStateToDispatch = dispatch => ({
  reverseWebsite: () => dispatch(action.reverseWebsite()),
})

export default connect(mapStateToProps, mapStateToDispatch)(Menu)
