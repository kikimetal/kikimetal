import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

// redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware, routerReducer, push } from 'react-router-redux'
import { createBrowserHistory } from "history"
const history = createBrowserHistory()
const middleware = routerMiddleware(history)
import reducers from "./modules/reducers"
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

// containers
import MyHelmet from "./containers/MyHelmet"
import Home from "./containers/Home"
import About from "./containers/About"
import Products from "./containers/Products"

// components
import NotFound from "./components/NotFound"
import Btn from "./components/Btn"
import KikiStar from './components/KikiStar'
import Nav from "./components/Nav"

// TODO transition 処理をうまく分離する
// transition
import { spring, AnimatedSwitch } from 'react-router-transition'
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

export default class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">

            <MyHelmet />
            <Nav />

            <AnimatedSwitch
              atEnter={bounceTransition.atEnter}
              atLeave={bounceTransition.atLeave}
              atActive={bounceTransition.atActive}
              mapStyles={mapStyles}
              className="animated-switch-wrapper"
            >
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route path="/products" component={Products} />
              <Route component={NotFound} />
            </AnimatedSwitch>

            <footer>
              <small>Powered by KIKIMETAL.</small>
            </footer>

          </div>{/*App*/}
        </ConnectedRouter>
      </Provider>
    )
  }
}
