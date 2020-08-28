import React, { useEffect, useState, useRef } from "react"
//Context
import {useGlobalStateContext} from '../context/globalContext'
// Styled Components
import { Cursor } from "../styles/globalStyles"

const CustomCursor = () => {
  const {cursorType} = useGlobalStateContext()
  const [mousePosition, setMousePosition] = useState({
    x:400,
    y:400,
  })

const onMouseMove = event => {
  const {pageX: x, pageY: y} = event
  setMousePosition({ x,y })
} 

useEffect(() => {
  document.addEventListener("mousemove", onMouseMove)
  return () => {
    document.removeEventListener("mousemove", onMouseMove)
  }
}, [])

  return (
    <>
      <Cursor 
          className={`${!!cursorType ? 'hovered': ''} ${cursorType}`}
          style={{left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </>
  )
}

export default CustomCursor