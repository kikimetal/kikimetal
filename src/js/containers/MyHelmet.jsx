import React from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"

// components
import ScrollToTopOnMount from "../components/ScrollToTopOnMount"

// グローバルオブジェクトにセットされてるルーティング情報を取得
const ROUTES = window.__ROUTES__
// 存在すれば path を、しなければ ルートの情報 を返す。
// 引数の path が 存在するか確認。
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

const mapStateToProps = state => ({ currentPath: state.router.location.pathname })
export default connect(mapStateToProps)(MyHelmet)
