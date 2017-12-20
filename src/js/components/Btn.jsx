import React from 'react'

const Btn = ({ children, label, ...props }) => (
  <span className="Btn" {...props}>
    {children || label}
  </span>
)
Btn.defaultProps = {
  label: "button",
}

export default Btn
