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
      skill="HTML, CSS, jQuery, JavaScript"
      period="2週間"
      comment="初めてのお仕事。改善点だらけだけど、意外と色褪せてない。"
      />

    <Site
      date="2016 02"
      title="あそび"
      image="mohumohu.png"
      url="http://kikimetal.com/portfolio/mohumohu/"
      skill="HTML, CSS, jQuery, JavaScript"
      period="3日"
      comment="もっと学べばいろんな表現ができそうだと実感した。"
      />

    <Site
      date="2017 04"
      title="協会のサイト"
      image="b-assoc.png"
      url="http://www.bulgarian-rose.or.jp"
      skill="PHP, HTML, CSS, JavaScript, canvas, p5js"
      period="1ヶ月"
      comment="ロード時に薔薇を咲かせたかったんや...。"
      />

    <Site
      date="2017 05"
      title="コーポレートサイト"
      image="cvl.png"
      url="http://www.carvancl.co.jp"
      skill="HTML, CSS, SVG, JavaScript"
      period="1週間"
      comment="トラックパッドで左手を描く苦行をクリア。"
      />

    <Site
      date="2017 09"
      title="香水のブランドサイト"
      image="garment_v2.png"
      url="https://www.takeruyamashita.com"
      skill="PHP, HTML, CSS, SVG, JavaScript, ES2015, React, Gulp, Babel"
      period="1ヶ月"
      comment="SPAのエクスペリエンスに憧れ...。"
      />

    <Site
      date="2017 10"
      title="美容系のECサイト"
      image="darena-ec.png"
      url="https://www.rosedarena.com/ec/html/"
      skill="PHP, HTML, CSS, JavaScript, EC-Cube"
      period="2週間"
      comment="Twigテンプレート解読するのは骨が折れた。"
      />

    <Site
      date="2017 12"
      title="www.kikimetal.com"
      image=""
      url="https://www.kikimetal.com"
      skill="PHP, HTML, CSS, JavaScript, ES2015, React, Redux, Gulp, Webpack, Babel"
      period="1週間"
      comment="SPAならではのスムーズなページ遷移アニメーションに血眼。"
      />

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

export default WebSite
// const mapStateToProps = state => ({selectedItem: state.selectedItem })
// const mapDispatchToProps = dispatch => ({
//   dispatchSelectItemCyan: () => dispatch(action.selectItem("cyan")),
//   dispatchSelectItemYellow: () => dispatch(action.selectItem("yellow")),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(WebSite)
