import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const textToType = 'All Hail Lelouch'
  const [textTyping, setTextTyping] = useState<string>('')

  useEffect(() => {
    const fn = function (event: { key: any; keyCode: any }) {
      console.log('KeyCode:', event.keyCode)
      if (event.keyCode === 8) {
        setTextTyping((prev) => prev.substring(0, prev.length - 1))
      } else if (event.keyCode >= 48 && event.keyCode <= 90) {
        setTextTyping((prev) => prev + event.key)
      } else if (event.keyCode === 32) {
        setTextTyping((prev) => prev + ' ')
      }
    }

    document.addEventListener('keydown', fn)
    return () => {
      document.removeEventListener('keydown', fn)
    }
  }, [])

  const onContainerClick = () => {
    // `current` points to the mounted text input element
    // inputEl.current.focus()
  }

  return (
    <>
      <div className="container" onClick={onContainerClick}>
        <div className="typing-container">
          <div className="typed-text">
            <p className="white-space">{textToType.substring(0, textTyping.length)}</p>
          </div>
          <div className="typewriter-space"></div>
          <div className="incoming-text">
            <p className="white-space">
              {textToType.substring(textTyping.length, textToType.length)}
            </p>
          </div>
          <div></div>
        </div>
        <div className="typing-container">
          <div className="typed-text">
            <p className="white-space">{textTyping.substring(textTyping.length - 30)}</p>
          </div>
          <div className="typewriter"></div>
          <div className="incoming-text">
            <p className="white-space">
              {textToType.substring(textTyping.length, textToType.length)}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default App
