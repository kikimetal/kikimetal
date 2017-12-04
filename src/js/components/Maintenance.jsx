import React from "react"

export default class Maintenance extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: true,
        }
    }
    render(){
        const style = {
            position: "fixed",
            top: "5px",
            left: this.props.position === "left" ? "5px" : "auto",
            right: this.props.position === "right" ? "5px" : "auto",
            background: "crimson",
            color: "white",
            padding: "0.6em 1.2em",
            borderRadius: "4px",
            fontSize: "8px",
            lineHeight: 1,
            boxShadow: "0 0 3px 0 rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 9999999,
            transition: "all 0.6s ease",
            opacity: this.state.show ? 1 : 0,
            transform: this.state.show ? "translateX(0)" : "translateX(-2em)",
            pointerEvents: this.state.show ? "auto" : "none",
        }
        return (
            <div className="Maintenance" style={style} onClick={()=>{this.setState({show: false})}}>
                現在メンテナンス中です。
            </div>
        )
    }
}
Maintenance.defaultProps = {
  position: "left",
}
