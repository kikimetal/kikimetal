import React from "react"
import PropTypes from "prop-types"

class HeightTransitionToFull extends React.Component{
  constructor(props){
    super(props)
    this.state = { height: window.innerHeight + "px" }
    this.changeHeight = this.changeHeight.bind(this)
  }
  componentDidMount(){
    this.changeHeight()
    window.addEventListener("resize", this.changeHeight)
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.changeHeight)
  }
  changeHeight(){
    this.setState({ height: window.innerHeight + "px" })
  }
  render(){
    const { children, className, style, ...props } = this.props
    return(
      <div
        className={`HeightTransitionToFull ${className}`}
        style={{ ...style, height: this.state.height }}
        {...props}
        >
        {children}
      </div>
    )
  }
}

HeightTransitionToFull.defaultProps = {
  className: "",
  style: {},
}

HeightTransitionToFull.propTypes = {
  children: PropTypes.any.isRequired,
}

export default HeightTransitionToFull
