import React from "react"
import { connect } from "react-redux"
// containers
import Form from './Form'

const Home = props => (
  <div className="Home page">
    <h1>Home</h1>
    <p>
      home... home... home... home... home... home...
      home... home... home...
    </p>
    <hr/>
    <Form />
  </div>
)

export default Home
// const mapStateToProps = state => state
// export default connect(mapStateToProps)(Home)
