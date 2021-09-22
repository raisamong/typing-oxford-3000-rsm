import React from 'react'
import TypingInline from 'src/components/TypingInline'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <button>Inline</button>
      <button>Paragraph</button>
      <TypingInline />
    </div>
  )
}

export default App
