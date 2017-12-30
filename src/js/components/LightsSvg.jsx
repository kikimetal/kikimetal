import React from "react"
// functions
import getRandomInt from "../functions/getRandomInt"

const LightsPath = ({ color, scale, rotate, x, y, delay }) => {
  color = color || "transparent"
  scale = scale || 0
  rotate = rotate ? rotate + 45 : 0
  x = x || 0
  y = y || 0
  delay = delay || 0
  return (
    <g className="lights-effect" stroke="none" strokeWidth="1" fill={color} fillRule="evenodd" transform={`scale(${scale}) translate(${x}, ${y})`} style={{animationDelay: -delay + "s"}}>
      <path d="M1.447,1.447 C6.447,6.447 6.447,6.447 11.447,1.447 C6.447,6.447 6.447,6.447 11.447,11.447 C6.447,6.447 6.447,6.447 1.447,11.447 C6.447,6.447 6.447,6.447 1.447,1.447 Z" id="Light-super-10px" transform={`translate(6.447, 6.447) rotate(${rotate}) translate(-6.447, -6.447)`}></path>
    </g>
  )
}

const arr = new Array(66).fill(null)
const LightsSvg = ({ width, height }) => {
  return (
    <svg className="LightsSvg" width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`} version="1.1">
      {arr.map((value, index) => (
        <LightsPath
          key={`lights-svg-path-${index}`}
          rotate={getRandomInt(0, 90)}
          scale={getRandomInt(1, 3) < 3 ? getRandomInt(5, 30) / 10 : getRandomInt(35, 60) / 10}
          x={getRandomInt(0, width)}
          y={getRandomInt(0, height)}
          delay={getRandomInt(0, 300) / 100}
          />
      ))}
    </svg>
  )
}

export default () => <LightsSvg width={window.innerWidth} height={window.innerHeight} />
