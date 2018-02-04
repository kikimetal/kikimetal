import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

// components
import Bg from "../components/Bg"
import KikiStar from "../components/KikiStar"
import Btn from "../components/Btn"

const Home = props => (
  <div className="Home page">

    <div className="first-view">

      <h1 className="first-view-content">
        <div className="logomark"><KikiStar /></div>
        <div className="main-text">
          KIKIMETAL
        </div>
        <div className="sub-text">現在改装中です。大目に見てね。</div>
      </h1>

      {/*<img className="twintail none" src="/assets/img/171221_kikimohu_v2_LineColorChange_transparent_min.png" alt="" />*/}

    </div>

    <section>
      <h1>序章</h1>
      <p>
        デザイナー、<br/>
        イラストレーター、<br/>
        フロントエンドエンジニア。<br/>
      </p>
      <p>
        そんな肩書きにとらわれず、<br/>
        より本質的に伝えたいものがあります。
      </p>
      <p>
        何が好きで、<br/>
        何をしてきて、<br/>
        何に挑みたいのか。
      </p>
      <p>
        私を少しでも感じ取ってもらえると幸いです。
      </p>
    </section>

    <section>
      <img className="twintail none" src="/assets/img/180125_ribon-min.jpg" alt="" />
      <img className="twintail" src="/assets/img/180110_twintail.jpg" alt="" />
    </section>

    <ul className="link-list" style={{padding: "60px 0"}}>
      <li className="link-list-item"><NavLink exact to="/"><Btn><i className="fas fa-bug" />Home</Btn></NavLink></li>
      <li className="link-list-item"><NavLink exact to="/graffiti"><Btn><i className="fab fa-accusoft" />Graffiti</Btn></NavLink></li>
      <li className="link-list-item"><NavLink to="/website"><Btn><i className="fas fa-code" />WebSite</Btn></NavLink></li>
    </ul>

  </div>
)

// export default Home
const mapStateToProps = state => ({
  windowSize: state.windowSize,
  router: state.router,
})
export default connect(mapStateToProps)(Home)
