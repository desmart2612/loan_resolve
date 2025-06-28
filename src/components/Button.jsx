import React from 'react'

function Button({label}) {
  return (
    <button type={`${label === "Submit" ? "submit" : ""}`} className={`btn rounded-pill p-2 flex-grow-1 text-light fw-medium fs-5`} style={{backgroundColor: "#6c10f4"}}>
      {label}
    </button>
  )
}

export default Button
