import React from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { connect } from "react-redux"
// router switch transition
import { spring, AnimatedSwitch } from "react-router-transition"
// scroll animation
import { animateScroll } from "react-scroll"
// onSwipe onTap
import ReactTouchEvents from "react-touch-events"

// containers
import MyHelmet from "./MyHelmet"
import Home from "./Home"
import Graffiti from "./Graffiti"
import WebSite from "./WebSite"
import Menu from "./Menu"

// components
import NotFound from "../components/NotFound"
import Btn from "../components/Btn"
import KikiStar from "../components/KikiStar"

// react-router-transition setting
/**
 * custom spring creator
 * 全ての値は数値(int)
 * val: 到達する値
 * stiffness: バネを引く強さ -> 高いほどスピードアップ
 * damping: 抵抗力 -> 高いほどバウンドせず、強さに抗う -> スピードダウン
 */
function bounce(val, override = {}) {
  return spring(val, {
    stiffness: 190,
    damping: 15,
    ...override,
  })
}
// switchRoute animation
const bounceTransitionBase = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
    translateY: 0,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0, {stiffness: 97, damping: 34}),
    // scale: bounce(0.8, {stiffness: 97, damping: 34}),
    scale: 1,
    translateY: 0,
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1, {stiffness: 210, damping: 33}),
    translateY: 0,
  },
}
const bounceTransitionSm = {
  atEnter: {
    opacity: 0,
    scale: 1,
    translateY: 36,
  },
  atLeave: {
    // opacity: bounce(0, {stiffness: 300, damping: 30}),
    // scale: 1,
    // translateY: 0,
  },
  atActive: {
    opacity: bounce(1, {stiffness: 102, damping: 25}),
    scale: 1,
    translateY: bounce(0, {stiffness: 132, damping: 22}),
  },
}
const bounceTransitionMd = bounceTransitionBase
const bounceTransitionLg = bounceTransitionMd

// we need to map the `scale` prop we define below // to the transform style property
function mapStyles(styles) {
  if (styles.scale && styles.translateY) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale}) translateY(${styles.translateY}px)`,
    }
  }
  if (styles.scale) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale})`,
    }
  }
  if (styles.translateY) {
    return {
      opacity: styles.opacity,
      transform: `translateY(${styles.translateY}px)`,
    }
  }
}

class App extends React.Component{
  constructor(props) {
    super(props)
    this.props.setScreenWidth(window.innerWidth)
    this.toTop = this.toTop.bind(this)
  }

  componentDidMount(){
    this.handleResize()
    window.addEventListener("resize", () => {
      this.handleResize()
    })
  }

  handleResize(){
    this.props.setScreenWidth(window.innerWidth)
    /* set style height100 class elements */
    setHeight100elements()
    function setHeight100elements(){
      let height100elements = document.getElementsByClassName("height100")
      height100elements = Array.from(height100elements)
      height100elements.forEach(elem => {
        elem.style.height = window.innerHeight + "px"
      })
    }
  }

  toTop(){
    animateScroll.scrollToTop({
      duration: window.pageYOffset / 2.6,
      smooth: "ease",
    })
  }

  render(){

    const bounceTransition = this.props.isScreenWidth.sm
      ? bounceTransitionSm
      : bounceTransitionMd

    // TODO: middleサイズ以上の画面height の設定を css 変更
    // 100vh -> 100% になるように。

    return (
      <div className="App">
        <MyHelmet />
        <div className="bg height100"></div>

        <main className="main height100">
          <nav>
            <Menu/>
          </nav>
          {/*<Header />*/}
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className={`animated-switch-wrapper ${!this.props.isScreenWidth.sm && "fix-height"}`}
            >
            <Route exact path="/" component={Home} />
            <Route exact path="/graffiti" component={Graffiti} />
            <Route path="/website" component={WebSite} />
            <Route component={NotFound} />
          </AnimatedSwitch>
        </main>

      </div>
    )
  }
}

const Footer = () => (
  <footer className="footer">
    <small>Powered by KIKIMETAL.</small>
  </footer>
)

const Header = () => (
  <div className="Header">
    <KikiStar spin={false} opacity={0.6}/>
    <Switch>
      <Route exact path="/" render={() => <span>Home</span>} />
      <Route exact path="/graffiti" render={() => <span>Graffiti</span>} />
      <Route path="/website" render={() => <span>WebSite</span>} />
    </Switch>
  </div>
)

import action from "../modules/action"

// const mapStateToProps = state => state // <- OK (router が入っているから)
const mapStateToProps = state => ({
  isScreenWidth: state.isScreenWidth,
  isShowTrigger: state.isShowTrigger,
  router: state.router, // <- 必須
  // ここで router を読み込まないと、react-router-transition が動作しない。
})
const mapStateToDispatch = dispatch => ({
  setScreenWidth: (width) => dispatch(action.setScreenWidth(width)),
  showTrigger: () => dispatch(action.showTrigger),
  hideTrigger: () => dispatch(action.hideTrigger),
})
export default connect(mapStateToProps, mapStateToDispatch)(App)
