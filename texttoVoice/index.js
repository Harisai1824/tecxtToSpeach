const speech = new SpeechSynthesisUtterance()
let voices = []

const voiceSelect = document.getElementById('voiceSelect')
const playButton = document.getElementById('playButton')
const textArea = document.querySelector('textarea')

// Load available voices
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices()
  voiceSelect.innerHTML = '' // clear existing options

  voices.forEach((voice, i) => {
    const option = new Option(`${voice.name} (${voice.lang})`, i)
    voiceSelect.add(option)
  })

  if (voices.length > 0) {
    speech.voice = voices[0]
  }
}

// Speak button
playButton.addEventListener('click', () => {
  const text = textArea.value.trim()
  if (text === '') {
    alert('Please enter some text to speak!')
    return
  }

  // stop any ongoing speech first
  window.speechSynthesis.cancel()

  speech.text = text
  window.speechSynthesis.speak(speech)
})

// Change voice when dropdown changes
voiceSelect.addEventListener('change', () => {
  speech.voice = voices[voiceSelect.value]
})
