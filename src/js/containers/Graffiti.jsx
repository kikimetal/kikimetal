import React from "react"
import {connect} from "react-redux"
// components
// ...
// modules
import action from "../modules/action"

const Graffiti = ({ kiki, dispatch_kiki_update }) => (
  <div className="Graffiti page">

    <h1 className="page-title">Graffiti</h1>

  </div>
)

export default Graffiti
// const mapStateToProps = (state) => {
//   return { kiki: state.kiki }
// }
// const mapDispatchToProps = (dispatch) => {
//   return { dispatch_kiki_update: () => dispatch(action.updateKiki) }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Graffiti)
