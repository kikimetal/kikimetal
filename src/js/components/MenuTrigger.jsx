import React from "react"

const MenuTrigger = ({ collapse }) => (
  <div className={`MenuTrigger ${collapse && "collapse"}`}>
    <span></span>
    <span></span>
    <span></span>
  </div>
)

export default MenuTrigger
