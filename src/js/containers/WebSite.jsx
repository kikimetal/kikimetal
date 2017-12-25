import React from 'react'
import { Link, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from "react-redux"
// components
import Btn from '../components/Btn'
import NotFound from '../components/NotFound'
import LazyLoadImg from '../components/LazyLoadImg'
// functions
import { getArrayFromJSON } from "../functions/getJSON"

class WebSite extends React.Component{
  componentDidMount(){
    if (!this.props.didSetData) {
      const data = getArrayFromJSON(`${location.origin}/assets/websites.json`)
      if (data) {
        this.props.getDataSuccess()
        this.props.setData(data)
      } else {
        // error
      }
    }
  }
  render(){
    console.log(this.props.didSetData)
    return (
      <div className="WebSite page">
        <h1 className="page-title top">WebSite</h1>
        <Btn
          style={{maxWidth: "400px"}}
          onClick={this.props.sortReverse}
          >
          SORT : {this.props.isReverse ? "古い順にする" : "新しい順にする"}
        </Btn>

        <div className={`Sites ${this.props.isReverse && "reverse"}`}>
          {this.props.websitesData.map((data) => (
            <Site
              key={data.title}
              title={data.title}
              date={data.date}
              image={data.image}
              url={data.url}
              skill={data.skill}
              period={data.period}
              comment={data.comment}
              />
          ))}
        </div>

        <h1 className="page-title bottom">WebSite</h1>
      </div>
    )
  }
}

const Site = ({ date, title, image, url, skill, period, comment }) => (
  <section className="Site">
    <div className="flex">
      <div className="flex-item">
        <h1>{title}</h1>
        <p className="description">
          制作時期: {date}<br/>
          制作期間: {period}<br/>
          言語等: {skill}
          {comment && <br/>}{comment && comment}
        </p>
        <p><a href={url}><Btn>みる</Btn></a></p>
      </div>
      <a className="flex-item" href={url}>
        <LazyLoadImg imgsrc={image ? "/assets/img/website/" + image : "/assets/img/kiki-star/square-centering.svg"} />
      </a>
    </div>
  </section>
)

const mapStateToProps = state => ({
  isReverse: state.isSortWebsitesReverse,
  didSetData: state.didSetWebsitesData,
  websitesData: state.websitesData,
})
// modules
import * as action from "../modules/action"
const mapDispatchToProps = dispatch => ({
  sortReverse: () => dispatch(action.sortReverseWebsites()),
  getDataSuccess: () => dispatch(action.getWebsitesDataSuccess()),
  setData: data => dispatch(action.setWebsitesData(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(WebSite)
