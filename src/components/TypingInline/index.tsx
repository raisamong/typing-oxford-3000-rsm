import React, { useEffect, useState } from 'react'
import { shuffle } from 'src/utils'
import { vocab } from 'src/vocab'
import './style.css'

const whilelistKeyCode = [189, 188, 190]
const textShowlenght = 30

const matchingText = (leadText: string, textToValidate: string) => {
  const textToMatched = leadText
    .substring(0, textToValidate.length)
    .substring(textToValidate.length - textShowlenght)
  const textTyped = textToValidate
    .substring(textToValidate.length - textShowlenght)
    .split('')
    .map((letter, index) => {
      const isMatched = textToMatched.charAt(index) === letter
      return (
        <span
          style={{
            color: isMatched ? '#7CEC01' : '#000',
            backgroundColor: isMatched ? '' : 'red',
          }}
        >
          {letter}
        </span>
      )
    })

  return textTyped
}

const TypingInline = () => {
  const [textToType, setTextToType] = useState<string>('')
  const [typedText, setTypedText] = useState<string>('')

  useEffect(() => {
    const fn = function (event: { key: any; keyCode: any }) {
      console.log('KeyCode:', event.keyCode)
      if (event.keyCode === 8) {
        setTypedText((prev) => prev.substring(0, prev.length - 1))
      } else if (
        (event.keyCode >= 48 && event.keyCode <= 90) ||
        whilelistKeyCode.includes(event.keyCode)
      ) {
        setTypedText((prev) => prev + event.key)
      } else if (event.keyCode === 32) {
        setTypedText((prev) => prev + ' ')
      }
    }

    document.addEventListener('keydown', fn)
    setTextToType(shuffle(vocab).join(' '))
    return () => {
      document.removeEventListener('keydown', fn)
    }
  }, [])

  const matchedText = matchingText(textToType, typedText)

  return (
    <>
      <div className="container">
        <div className="typing-container">
          <div className="typed-text">
            <div className="inner-div">
              <p className="white-space">{typedText}</p>
            </div>
          </div>
          <div className="typewriter-space"></div>
          <div className="incoming-text">
            <p className="white-space">
              {textToType.substring(typedText.length, typedText.length + textShowlenght)}
            </p>
          </div>
          <div></div>
        </div>
        <div className="typing-container">
          <div className="typed-text">
            <div className="inner-div">
              <p className="white-space">{matchedText}</p>
            </div>
          </div>
          <div className="typewriter"></div>
          <div className="incoming-text">
            <p className="white-space">
              {textToType.substring(typedText.length, typedText.length + textShowlenght)}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default TypingInline
