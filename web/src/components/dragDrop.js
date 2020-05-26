//https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929
import React, { useState, useEffect, useRef } from 'react'

var DragDrop = props => {
  const [bgColor, setBgColor] = useState('transparent')
  // const ref = useRef()

  // Monitor changes to position state and update DOM
  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
  //   }
  // }, [position])

  // Update the current position if mouse is down
  // const onMouseMove = (event) => {
  //   if (pressed) {
  //     setPosition({
  //       x: position.x + event.movementX,
  //       y: position.y + event.movementY
  //     })
  //   }
  // }
  const changeBgColor = (state) => {
    console.log(state)
    setBgColor(state && 'green' || 'transparent')
    // setBgColor('green')
  }

  return (
    <div style={{
      backgroundColor: bgColor
    }} className={props.className}
      // ref={ref}
      onDragEnter={(e) => {
        e.preventDefault()
        e.stopPropagation()
        changeBgColor(true)
        e.dataTransfer.dropEffect = 'copy'
        console.log('DragEnter', e.dataTransfer.items.length)
      }}
      
      onDragLeave={(e) => {
        e.preventDefault()
        e.stopPropagation()
        changeBgColor(false)
        console.log('onDragLeave')
      }}

      onDragOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('onDragOver')
      }}

      onDrop={(e) => { 
        e.preventDefault()
        e.stopPropagation()
        changeBgColor(false)
        console.log(e.dataTransfer.items)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          props.sendFiles(e.dataTransfer.files)
        }
      }}
    >
      {props.children}
    </div>
  )
}

export default DragDrop