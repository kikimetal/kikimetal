import React from "react"
import {connect} from "react-redux"
// components
// ...
// modules
import action from "../modules/action"

const About = ({ kiki, dispatch_kiki_update }) => (
  <div className="About page">
    <h1>About</h1>
    <p>
      about... about... about... about... about... about...
      about... about... about... about... about... about...
      about... about... about... about... about... about...
    </p>
    <h2>kiki->age: {kiki.age}</h2>
    <h2>kiki->text: {kiki.text}</h2>
    <span className="Btn" onClick={dispatch_kiki_update}>UPDATE</span>
  </div>
)

const mapStateToProps = (state) => {
  return { kiki: state.kiki }
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch_kiki_update: () => dispatch(action.updateKiki) }
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
