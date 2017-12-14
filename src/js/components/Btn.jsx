import React from 'react'

const Btn = ({ children, label, ...props }) => (
  <button className="Btn" {...props}>
    {children || label}
  </button>
)
Btn.defaultProps = {
  label: "button",
}

export default Btn
