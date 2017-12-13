import React from 'react'

const Btn = ({ children, label, ...props }) => (
  <div className="Btn" {...props}>
    {children || label}
  </div>
)
Btn.defaultProps = {
  label: "button",
}

export default Btn
