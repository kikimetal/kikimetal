import React from 'react'

const KikiStar = ({ spin, opacity }) => (
  <div className={`KikiStar ${spin && "spin"}`} style={{opacity}}></div>
)

export default KikiStar
