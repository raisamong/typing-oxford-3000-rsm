import React, { useEffect, useState } from 'react'
import { shuffle } from 'src/utils'
import { vocab, vocabJson as vocabIndex } from 'src/vocab'
import './style.css'

const whilelistKeyCode = [189, 188, 190]
const textShowlenght = 30
const space = ' '

const isWordExists = (word: string): boolean => {
  return vocabIndex[word]
}

const matchingText = (textToMatched: string, textToValidate: string) => {
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

interface TypingInlineProps {
  speakWord: (word: string) => void
}

const TypingInline = (props: TypingInlineProps) => {
  const { speakWord } = props

  const [textToType, setTextToType] = useState<string>('')
  const [typedText, setTypedText] = useState<string>('')
  const [word, setWord] = useState<string>('')
  const [triggerSpeak, setTriggerSpeak] = useState<boolean>(false)

  useEffect(() => {
    const fn = function (event: any) {
      console.log('KeyCode:', event.keyCode, event.key)
      if (event.keyCode === 8) {
        setTypedText((prev) => prev.substring(0, prev.length - 1))
        setWord((prev) => prev.substring(0, prev.length - 1))
      } else if (
        (event.keyCode >= 48 && event.keyCode <= 90) ||
        whilelistKeyCode.includes(event.keyCode)
      ) {
        setTypedText((prev) => prev + event.key)
        setWord((prev) => prev + event.key)
        setTriggerSpeak(false)
      } else if (event.keyCode === 32) {
        setTriggerSpeak(true)
        setTypedText((prev) => prev + space)
        setWord((prev) => prev + space)
      }
    }

    document.addEventListener('keyup', fn)
    setTextToType(shuffle(vocab).join(space))
    return () => {
      document.removeEventListener('keyup', fn)
    }
  }, [])

  useEffect(() => {
    if (
      isWordExists(word.trim()) &&
      triggerSpeak &&
      textToType.charAt(typedText.length - 1) === space
    ) {
      speakWord(word)
      setWord('')
    }
  }, [speakWord, textToType, triggerSpeak, typedText, word])

  const textToMatched = textToType
    .substring(0, typedText.length)
    .substring(typedText.length - textShowlenght)
  const matchedText = matchingText(textToMatched, typedText)
  const incomingText = textToType.substring(typedText.length, typedText.length + textShowlenght)

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
            <p className="white-space">{incomingText}</p>
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
            <p className="white-space">{incomingText}</p>
          </div>
        </div>
        <p className="white-space">{word.trim() ? `"${word}"` : space}</p>
      </div>
    </>
  )
}

export default TypingInline
