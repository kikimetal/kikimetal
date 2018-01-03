import React from "react"
import { connect } from "react-redux"

const Graffiti = ({ ww, wh }) => (
  <div className="Graffiti page">

    <h1 className="page-title">Graffiti</h1>

    <hr />
    <h2>ww: {ww}</h2>
    <h2>wh: {wh}</h2>
    <h2>ori: {window.orientation}</h2>

  </div>
)

const mapStateToProps = state => ({
  ww: state.windowWidth,
  wh: state.windowHeight,
})

export default connect(mapStateToProps)(Graffiti)
