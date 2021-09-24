import React, { useState } from 'react'
import TypingInline from 'src/components/TypingInline'
import TypingParagraph from 'src/components/TypingParagraph'
import { vocab } from 'src/vocab'
import './App.css'

const inline = 'inline'
const paragraph = 'paragraph'

type TypingMode = 'inline' | 'paragraph'

function App() {
  const [mode, setMode] = useState<TypingMode>('inline')
  const [speaker] = useState<SpeechSynthesisUtterance>(new SpeechSynthesisUtterance('test'))

  // useEffect(() => {
  //   setSpeaker()
  // }, [])

  const onClick = () => {
    window.speechSynthesis.speak(speaker)
  }
  const onChange = () => {
    speaker.text = vocab[Math.floor(Math.random() * vocab.length) + 1]
    window.speechSynthesis.speak(speaker)
  }

  const SpeakWord = (word: string) => {
    speaker.text = word
    window.speechSynthesis.speak(speaker)
  }

  return (
    <div className="app-container">
      <button
        onClick={() => {
          setMode(inline)
        }}
      >
        Inline
      </button>
      <button
        onClick={() => {
          setMode(paragraph)
        }}
      >
        Paragraph
      </button>
      <button onClick={onClick}>Speak</button>
      <button onClick={onChange}>Random</button>

      {mode === inline && <TypingInline speakWord={SpeakWord} />}
      {mode === paragraph && <TypingParagraph />}
    </div>
  )
}

export default App
