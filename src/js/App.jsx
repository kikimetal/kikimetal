import React from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import Btn from "./components/Btn"
import Home from "./Home"
import About from "./About"
import Products from "./Products"
import NotFound from "./NotFound"

import { spring, AnimatedSwitch } from 'react-router-transition'

// import '../css/common/common.scss'
// import '../css/components/Btn.scss'
// import './App.scss'

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// spring config 全ての値は数値(int)
// val: 到達する値
// stiffness: バネを引く強さ -> 高いほどスピードアップ
// damping: 抵抗力 -> 高いほどバウンドせず、強さに抗う -> スピードダウン

// custom spring creator
function bounce(val, override = {}) {
  return spring(val, {
    stiffness: 190,
    damping: 15,
    ...override,
  });
}
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0, {stiffness: 97, damping: 34}),
    scale: bounce(0.8, {stiffness: 97, damping: 34}),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

// console.log(bounceTransition.atLeave.opacity)
// console.log(bounceTransition.atActive.opacity)

import KikiStar from './components/KikiStar'
import Bg from './components/Bg'

export default class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <div className="grid">
            <ul className="header">
              <div>

                <Bg />
                <Bg />
                <Bg />
                <KikiStar />
              </div>
              <Bg />
              <h2>Header</h2>
              <i className="fas fa-user fa-2x fa-spin"></i>
              <li><Link to="/"><Btn>Home</Btn></Link></li>
              <li><Link to="/about"><Btn>About</Btn></Link></li>
              <li><Link to="/products"><Btn>Products</Btn></Link></li>
            </ul>
            <div className="main">

              <AnimatedSwitch
                atEnter={bounceTransition.atEnter}
                atLeave={bounceTransition.atLeave}
                atActive={bounceTransition.atActive}
                mapStyles={mapStyles}
                className="switch-wrapper"
                >
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route path="/products" component={Products} />
                <Route component={NotFound} />
              </AnimatedSwitch>

            </div>
            <div className="side">side</div>
            <div className="footer">footer</div>
          </div>{/* grid */}

          <div className="test">
            <h1>TEST</h1>
          </div>

        </div>
      </BrowserRouter>
    )
  }
}

// const KikiStar = () => (
//   <div>k</div>
// )
