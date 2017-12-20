import React from "react"
import { connect } from "react-redux"

// components
import KikiStar from "../components/KikiStar"

const Home = props => (
  <div className="Home page">

    <h1>Welcome kikimetal.com</h1>
    <p>ようこそ！</p>
    <p>
      ここはききめたるの遊び場とか...<br/>
      ポートフォリオっぽい何かです。
    </p>

  </div>
)

export default Home
// const mapStateToProps = state => state
// export default connect(mapStateToProps)(Home)
