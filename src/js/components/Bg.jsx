import React from "react"

const Bg = ({ imgsrc, size, position, scale, className }) => {
  return (
    <div
      className={`Bg height100`}
      style={{
        backgroundImage: `url("${imgsrc}")`,
        backgroundSize: size || "contain",
        backgroundPosition: position || "center",
        transform: `scale(${scale || 1.2})`,
      }}></div>
  )
}

export default Bg
