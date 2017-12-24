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
  // constructor(){
  //   super()
  //   this.state = {
  //     reverse: false,
  //   }
  // }
  render(){
    return (
      <div className="WebSite page">
        <h1 className="page-title top">WebSite</h1>
        <Btn
          style={{maxWidth: "300px"}}
          onClick={this.props.sortReverse}
          >
          SORT : {this.props.isReverse ? "古い順にする" : "新しい順にする"}
        </Btn>
        <Sites reverse={this.props.isReverse} />
        <h1 className="page-title bottom">WebSite</h1>
      </div>
    )
  }
}

let websites = getArrayFromJSON(`${location.origin}/assets/websites.json`)

const Sites = ({ reverse }) => (
  <div className={`Sites ${reverse && "reverse"}`}>
    {websites.map((data) => {
      return <Site
        key={data.title}
        title={data.title}
        date={data.date}
        image={data.image}
        url={data.url}
        skill={data.skill}
        period={data.period}
        comment={data.comment}
        />
    })}
  </div>
)

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
      <div className="flex-item">
        <a href={url}>
          <LazyLoadImg imgsrc={image ? "/assets/img/website/" + image : "/assets/img/kiki-star/square-centering.svg"} />
        </a>
      </div>
    </div>
  </section>
)

const mapStateToProps = state => ({
  isReverse: state.isSortWebsitesReverse,
})
// modules
import { sortReverseWebsites } from "../modules/action"
const mapDispatchToProps = dispatch => ({
  sortReverse: () => dispatch(sortReverseWebsites()),
})
export default connect(mapStateToProps, mapDispatchToProps)(WebSite)
