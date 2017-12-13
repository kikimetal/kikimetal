import React from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"

// 引数の path :string が 存在する route か確認。
// 存在すれば path を、しなければ false を返す。
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
    window.scrollTo(0, 0)
  }
  render() {
    return null
  }
}

const mapStateToProps = state => ({ currentPath: state.router.location.pathname })
export default connect(mapStateToProps)(MyHelmet)
