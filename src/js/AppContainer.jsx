import React from "react"
import ReactDOM from "react-dom"

// containers
import App from "./containers/App"

// redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware, routerReducer, push } from 'react-router-redux'
import { createBrowserHistory } from "history"
const history = createBrowserHistory()
const middleware = routerMiddleware(history)

// modules
import reducers from "./modules/reducers"

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware)
)

export default class AppContainer extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  }
}
