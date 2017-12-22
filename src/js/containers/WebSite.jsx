import React from 'react'
import { Link, Route, Switch, Redirect} from 'react-router-dom'
import { connect } from "react-redux"
// components
import Btn from '../components/Btn'
import NotFound from '../components/NotFound'
import LazyLoadImg from '../components/LazyLoadImg'
// modules
import action from "../modules/action"

class WebSite extends React.Component{
  constructor(){
    super()
    this.state = {
      reverse: false,
    }
  }
  render(){
    return (
      <div className="WebSite page">
        <h1 className="page-title top">WebSite</h1>
        <Btn
          style={{maxWidth: "300px"}}
          onClick={() => this.setState({reverse: !this.state.reverse})}
          >
          SORT : {this.state.reverse ? "古い順にする" : "新しい順にする"}
        </Btn>
        <Sites reverse={this.state.reverse} />
        <h1 className="page-title bottom">WebSite</h1>
      </div>
    )
  }
}

function getJSON(url) {
  var req = new XMLHttpRequest()

  // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
  req.onreadystatechange = function() {
    if(req.readyState == 4 && req.status == 200){ // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合
      // alert(req.responseText) // 取得した JSON ファイルの中身を表示
      // return req.responseText
    }
  }
  req.open("GET", url, false)
  req.send(null)
  return JSON.parse(req.responseText)
}

// let websites = getJSON(`${window.__ASSETS__}/websites.json`)
let websites = getJSON(`${location.origin}/assets/websites.json`)
websites = Object.values(websites) // 値を詰め込んだ配列へ

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

export default WebSite
// const mapStateToProps = state => ({selectedItem: state.selectedItem })
// const mapDispatchToProps = dispatch => ({
//   dispatchSelectItemCyan: () => dispatch(action.selectItem("cyan")),
//   dispatchSelectItemYellow: () => dispatch(action.selectItem("yellow")),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(WebSite)
