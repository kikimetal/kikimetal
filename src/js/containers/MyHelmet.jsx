import React from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"

// 引数の path :string が 存在する route か確認。
// 存在すれば path を、しなければ ルートの情報 を返す。
const ROUTES = window.__ROUTES__
const checkRoute = path => {
  const route = Object.keys(ROUTES).find(route => route === path) || false
  return route ? ROUTES[route] : ROUTES["/"]
}

const MyHelmet = ({ currentPath }) => {
  const route = checkRoute(currentPath)
  return (
    <div>
      <ScrollToTopOnMount />
      <Helmet>
        <title>{route.title}</title>
        <meta name="description" content={route.description} />
        <link rel="canonical" href={route.canonical} />
      </Helmet>
    </div>
  )
}

class ScrollToTopOnMount extends React.Component {
  componentDidUpdate(prevProps) {
    // Y方向を 0にすると、iOS系のブラウザでURL入力欄が大きくなる
    // 1 にすることでそれを防げる
    window.scrollTo(0, 1)
  }
  render() {
    return null
  }
}

const mapStateToProps = state => ({ currentPath: state.router.location.pathname })
export default connect(mapStateToProps)(MyHelmet)
