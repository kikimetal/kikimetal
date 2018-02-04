import React from "react"
import getRandomInt from "../functions/getRandomInt"

const Bg = ({ color, imgsrc, size, position, scale, className }) => {
  const bgimage = imgsrc ? {backgroundImage: `url("${imgsrc}")`} : {}
  return (
    <div
      className={`Bg ${className}`}
      style={{
        ...bgimage,
        backgroundColor: color,
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
