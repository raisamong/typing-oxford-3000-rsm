import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup'
import { initializeIcons } from '@fluentui/react/lib/Icons'
import { Toggle } from '@fluentui/react/lib/Toggle'
import React, { useState } from 'react'
import TypingInline from 'src/components/TypingInline'
import TypingParagraph from 'src/components/TypingParagraph'
import './App.css'

initializeIcons()

const inline = 'inline'
const paragraph = 'paragraph'

const modeOptions: IChoiceGroupOption[] = [
  { key: inline, text: 'Inline', iconProps: { iconName: 'CompassNW' } },
  { key: paragraph, text: 'Paragraph', iconProps: { iconName: 'CalendarWeek' } },
]

export const ModeSelector: React.FunctionComponent = () => {
  return <ChoiceGroup label="Mode" defaultSelectedKey={inline} options={modeOptions} />
}

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
    <>
      <Toggle
        styles={{
          root: {
            justifyContent: 'end',
            padding: '1rem',
          },
          label: {
            color: '#fff',
          },
          text: {
            color: '#fff',
          },
        }}
        label="Enabled Pronunciation"
        onText="On"
        offText="Off"
        inlineLabel
        checked={enabledSpeaking}
        onChange={toggleSpeaking}
      />
      <div className="app-container">
        {/* <ModeSelector />
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
      </button> */}

        {mode === inline && <TypingInline speakWord={SpeakWord} />}
        {mode === paragraph && <TypingParagraph />}
      </div>
    </>
  )
}

export default App
