import React from 'react'
import { Link, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from "react-redux"
// components
import Btn from '../components/Btn'
import NotFound from '../components/NotFound'
import LazyLoadImg from '../components/LazyLoadImg'

class WebSite extends React.Component{
  componentDidMount(){
    if (this.props.dataCondition !== "success") {
      fetch(`${location.origin}/assets/websites.json`)
        .then((response) => {
          if(!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(response => response.json())
        .then(jsonDataObj => Object.values(jsonDataObj))
        .then(jsonDataArr => this.props.setData(jsonDataArr))
        .then(() => this.props.setCondition("success"))
        .catch((errorText) => this.props.setCondition("error"))
    }
  }
  render(){
    if (this.props.dataCondition === "error") {
      return (
        <div className="WebSite page">
          <h1 className="page-title top">WebSite</h1>
          <p style={{
              color: "hotpink",
              fontSize: "28px",
            }}>Sorry, server error x(</p>
        </div>
      )
    }
    return (
      <div className="WebSite page">

        <h1 className="page-title">WebSite</h1>

        <div className={`Sites ${this.props.isReverse && "reverse"}`}>
          {this.props.data.map((data) => (
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
        <LazyLoadImg className="img-link" imgsrc={image ? "/assets/img/website/" + image : "/assets/img/kiki-star/square-centering.svg"} />
      </a>
    </div>
  </section>
)

const mapStateToProps = state => ({
  dataCondition: state.websitesDataCondition,
  data: state.websitesData,
  isReverse: state.isReverseWebsite,
})
// modules
import * as action from "../modules/action"
const mapDispatchToProps = dispatch => ({
  sortReverse: () => dispatch(action.sortReverseWebsites()),
  setCondition: condition => dispatch(action.setWebsitesDataCondition(condition)),
  setData: data => dispatch(action.setWebsitesData(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(WebSite)
