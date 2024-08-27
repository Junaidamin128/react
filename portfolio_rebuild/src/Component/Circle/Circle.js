import React from 'react'
import "./Circle.scss";

function Circle({mousePosition}) {
  return (
    <>
    {console.log(mousePosition, 'postition')}
    <div
      className="circle circle-bg"
      style={{ left: mousePosition.x, top: mousePosition.y }}
    />
    <div
      className="circle circle-br"
      style={{ left: mousePosition.x , top: mousePosition.y  }}
    />
  </>
  )
}

export default Circle