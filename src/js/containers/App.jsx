import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
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
import LightsSvg from "./LightsSvg"

// components
import Btn from "../components/Btn"
import Bg from "../components/Bg"
import NotFound from "../components/NotFound"
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
    scale: 1.1,
    // translateY: 0,
    // translateY: 40,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    // opacity: bounce(0, {stiffness: 227, damping: 32}),
    opacity: bounce(0, {stiffness: 207, damping: 35}),
    scale: 1,
    // translateY: 0,
    // translateY: bounce(-20, {stiffness: 122, damping: 24})
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    // opacity: bounce(1, {stiffness: 182, damping: 25}),
    opacity: bounce(1, {stiffness: 82, damping: 35}),
    // scale: bounce(1, {stiffness: 210, damping: 33}),
    scale: bounce(1),
    // translateY: 0,
    // translateY: bounce(0, {stiffness: 152, damping: 22}),
  },
}
const bounceTransitionSm = {
  atEnter: {
    opacity: 0,
    scale: 1.1,
    // translateY: 46,
  },
  atLeave: {
    // opacity: bounce(0, {stiffness: 300, damping: 30}),
    // scale: 1,
    // translateY: 0,
  },
  atActive: {
    opacity: bounce(1, {stiffness: 112, damping: 35}),
    scale: bounce(1),
    // translateY: bounce(0, {stiffness: 162, damping: 23}),
  },
}
const bounceTransitionMd = bounceTransitionBase

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
  return {
    opacity: styles.opacity,
  }
}

// loader events
window.addEventListener("load", () => {
  let bg = document.getElementById("loader")
  bg.classList.add("loader-fade-out")
  let app = document.querySelector(".App")
  app.classList.add("app-fade-in")
})

class App extends React.Component{
  constructor(props) {
    super(props)
    this.props.setWindowSize()
    this.toTop = this.toTop.bind(this)
  }

  componentDidMount(){
    this.props.setWindowSize()
    window.addEventListener("resize", this.props.setWindowSize)
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.props.setWindowSize)
  }

  toTop(){
    animateScroll.scrollToTop({
      duration: window.pageYOffset / 2.6,
      smooth: "ease",
    })
  }

  render(){
    const bounceTransition = this.props.windowSize === "sm"
      ? bounceTransitionSm
      : bounceTransitionMd

    const currentPathname = this.props.router.location.pathname

    return (
      <div className="App">

        <MyHelmet />

        {/*<Bg
          className={currentPathname === "/" ? "home" : currentPathname.slice(1)}
          size={this.props.windowSize === "sm" ? "cover" : "contain"}
          scale={1}
        />*/}

        <LightsSvg />

        <nav className="nav">
          <Menu/>
        </nav>

        <main className="main">
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className={`animated-switch-wrapper ${!this.props.windowSize === "sm" && "fix-height"}`}
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

const mapStateToProps = state => ({
  windowSize: state.windowSize,
  router: state.router, // <- 必須。ここで router を読み込まないと、react-router-transition が動作しない。
})

import * as action from "../modules/action"
const mapStateToDispatch = dispatch => ({
  setWindowSize: () => dispatch(action.setWindowSize()),
})

export default connect(mapStateToProps, mapStateToDispatch)(App)
