import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

// components
import KikiStar from "../components/KikiStar"
import Btn from "../components/Btn"

const Home = props => (
  <div className="Home page">

    <div className="first-view height100">
      <h1>Welcome kikimetal.com</h1>
      <p>ようこそ！</p>
      <p>
        ここはききめたるの遊び場とか...<br/>ポートフォリオっぽい何かです。
      </p>
    </div>

    <ul className="link-list">
      <li className="link-list-item"><NavLink exact to="/"><Btn><i className="fas fa-bug" />Home</Btn></NavLink></li>
      <li className="link-list-item"><NavLink exact to="/graffiti"><Btn><i className="fab fa-accusoft" />Graffiti</Btn></NavLink></li>
      <li className="link-list-item"><NavLink to="/website"><Btn><i className="fas fa-code" />WebSite</Btn></NavLink></li>
    </ul>

  </div>
)

// export default Home
const mapStateToProps = state => state
export default connect(mapStateToProps)(Home)
