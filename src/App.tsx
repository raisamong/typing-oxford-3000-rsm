import { Toggle } from '@fluentui/react/lib/Toggle'
import React, { useState } from 'react'
import TypingInline from 'src/components/TypingInline'
import TypingParagraph from 'src/components/TypingParagraph'
import './App.css'

const inline = 'inline'
const paragraph = 'paragraph'

type TypingMode = 'inline' | 'paragraph'

function App() {
  const [mode, setMode] = useState<TypingMode>('inline')
  const [speaker] = useState<SpeechSynthesisUtterance>(new SpeechSynthesisUtterance('test'))
  const [enabledSpeaking, setEnabledSpeaking] = useState<boolean>(false)

  const SpeakWord = (word: string) => {
    if (!enabledSpeaking) return
    speaker.text = word
    window.speechSynthesis.speak(speaker)
  }

  const toggleSpeaking = (_e: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    setEnabledSpeaking(checked || false)
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
      <Toggle
        label="Enabled Pronunciation"
        onText="On"
        offText="Off"
        inlineLabel
        checked={enabledSpeaking}
        onChange={toggleSpeaking}
      />
      {mode === inline && <TypingInline speakWord={SpeakWord} />}
      {mode === paragraph && <TypingParagraph />}
    </div>
  )
}

export default App
