import React, { useState } from 'react'
import './App.css'

function App() {
  const textToType = 'All Hail Lelouch'
  const [textTyping, setTextTyping] = useState<string>('')

  return (
    <>
      <div className="typing-container">
        <div className="typed-text">
          <p>{textToType.substring(0, textTyping.length)}</p>
        </div>
        <div></div>
        <div className="incoming-text">
          <p>{textToType.substring(textTyping.length, textToType.length)}</p>
        </div>
        <div></div>
      </div>
      <div className="typing-container">
        <div className="typed-text">
          <p>{textTyping.substring(textTyping.length - 30)}</p>
        </div>
        <div className="typewriter"></div>
        <div className="incoming-text">
          <p>{textToType.substring(textTyping.length, textToType.length)}</p>
        </div>
        <div></div>
      </div>

      <input
        onChange={(e) => {
          console.log(e.target.value)
          setTextTyping(e.target.value)
        }}
      ></input>
    </>
  )
}

export default App
