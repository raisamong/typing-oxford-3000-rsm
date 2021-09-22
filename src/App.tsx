import React, { useState } from 'react'
import TypingInline from 'src/components/TypingInline'
import TypingParagraph from 'src/components/TypingParagraph'
import './App.css'

const inline = 'inline'
const paragraph = 'paragraph'

type TypingMode = 'inline' | 'paragraph'

function App() {
  const [mode, setMode] = useState<TypingMode>('inline')

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

      {mode === inline && <TypingInline />}
      {mode === paragraph && <TypingParagraph />}
    </div>
  )
}

export default App
