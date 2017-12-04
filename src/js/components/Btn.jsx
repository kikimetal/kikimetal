import React from 'react'

const Btn = ({children, label}) => (
  <div className="Btn">
    {children || label}
  </div>
)
Btn.defaultProps = {
  label: "button",
}

export default Btn
