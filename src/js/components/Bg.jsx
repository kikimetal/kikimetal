import React from "react"
import getRandomInt from "../functions/getRandomInt"

const Bg = ({ color, imgsrc, size, position, scale, className }) => {
  // const arr = new Array(11).fill(null)
  // const dStyle = document.documentElement.style
  // arr.forEach((value, i) => {
  //   dStyle.setProperty(`--bg-w${i + 1}`, `${(i + 1) * (13 - i / 2)}%`)
  // })
  return (
    <div
      className={`Bg ${className}`}
      style={{
        backgroundColor: color,
        // backgroundImage: `url("${imgsrc}")`,
        backgroundSize: size,
        backgroundPosition: position,
        transform: `scale(${scale})`,
      }}></div>
  )
}
Bg.defaultProps = {
  className: "",
  color: "transparent",
  size: "cover",
  position: "center",
  scale: 1,
}

export default Bg
