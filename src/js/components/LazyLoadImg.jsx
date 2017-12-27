import React from "react"

export default class LazyLoadImg extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isShowPlaceholder: true,
    }
  }
  render(){

    const hidePlaceholder = () => {
      this.setState({isShowPlaceholder: false})
    }

    return (
      <div className={`LazyLoadImg ${this.props.className}`}>
        <img src={this.props.imgsrc} onLoad={hidePlaceholder} />
        <div className={`placeholder ${this.state.isShowPlaceholder ? "show" : "hide"}`}>
          <span><i className="far fa-sun fa-spin"></i></span>
          <span> LOADING...</span>
        </div>
      </div>
    )
  }
}
