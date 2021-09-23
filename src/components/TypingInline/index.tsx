import React, { useEffect, useState } from 'react'
import { shuffle } from 'src/utils'
import { vocab } from 'src/vocab'
import './style.css'

const whilelistKeyCode = [189, 188, 190]

const TypingInline = () => {
  const [textToType, setTextToType] = useState<string>('')
  const [textTyping, setTextTyping] = useState<string>('')

  useEffect(() => {
    const fn = function (event: { key: any; keyCode: any }) {
      console.log('KeyCode:', event.keyCode)
      if (event.keyCode === 8) {
        setTextTyping((prev) => prev.substring(0, prev.length - 1))
      } else if (
        (event.keyCode >= 48 && event.keyCode <= 90) ||
        whilelistKeyCode.includes(event.keyCode)
      ) {
        setTextTyping((prev) => prev + event.key)
      } else if (event.keyCode === 32) {
        setTextTyping((prev) => prev + ' ')
      }
    }

    document.addEventListener('keydown', fn)
    setTextToType(shuffle(vocab).join(' '))
    return () => {
      document.removeEventListener('keydown', fn)
    }
  }, [])

  const textToMatched = textToType.substring(0, textTyping.length).substring(textTyping.length - 30)
  const textTyped = textTyping
    .substring(textTyping.length - 30)
    .split('')
    .map((letter, index) => {
      const isMatched = textToMatched.charAt(index) === letter
      return (
        <span
          style={{
            color: isMatched ? 'green' : '#000',
            backgroundColor: isMatched ? '' : 'red',
          }}
        >
          {letter}
        </span>
      )
    })
  return (
    <>
      <div className="container">
        <div className="typing-container">
          <div className="typed-text">
            <div className="inner-div">
              <p className="white-space">{textToMatched}</p>
            </div>
          </div>
          <div className="typewriter-space"></div>
          <div className="incoming-text">
            <p className="white-space">
              {textToType.substring(textTyping.length, textTyping.length + 30)}
            </p>
          </div>
          <div></div>
        </div>
        <div className="typing-container">
          <div className="typed-text">
            <div className="inner-div">
              <p className="white-space">{textTyped}</p>
            </div>
          </div>
          <div className="typewriter"></div>
          <div className="incoming-text">
            <p className="white-space">
              {textToType.substring(textTyping.length, textTyping.length + 30)}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default TypingInline
