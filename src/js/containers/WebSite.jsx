import React from 'react'
import { Link, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from "react-redux"
// components
import Btn from '../components/Btn'
import NotFound from '../components/NotFound'
import LazyLoadImg from '../components/LazyLoadImg'
// modules
import action from "../modules/action"

const WebSite = (props) => (
  <div className="WebSite page">

    <h1 className="page-title">WebSite</h1>

    <Site
      date="2016 11"
      title="香水ブランドサイト"
      image="garment_v1.png"
      url="http://kikimetal.com/portfolio/garment/v1/"
      />

    <Site
      date="2016 02"
      title="あそび"
      image="mohumohu.png"
      url="http://kikimetal.com/portfolio/mohumohu/"
      />

    <Site
      date="2017 04"
      title="協会のサイト"
      image="b-assoc.png"
      url="http://www.bulgarian-rose.or.jp"
      />

    <Site
      date="2017 05"
      title="コーポレートサイト"
      image="cvl.png"
      url="http://www.carvancl.co.jp"
      />

    <Site
      date="2017 09"
      title="香水のブランドサイト"
      image="garment_v2.png"
      url="https://www.takeruyamashita.com"
      />

    <Site
      date="2017 10"
      title="美容系のECサイト"
      image="darena-ec.png"
      url="https://www.rosedarena.com/ec/html/"
      />

  </div>
)

const Site = ({ date, title, image, url, children }) => (
  <section className="Site">
    <div className="flex">
      <div className="flex-item">
        <p><small>{date}</small></p>
        <h1>{title}</h1>
        <p>
          {children}
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

export default WebSite
// const mapStateToProps = state => ({selectedItem: state.selectedItem })
// const mapDispatchToProps = dispatch => ({
//   dispatchSelectItemCyan: () => dispatch(action.selectItem("cyan")),
//   dispatchSelectItemYellow: () => dispatch(action.selectItem("yellow")),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(WebSite)
