import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const [copySuccess, setCopySuccess] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
    setCopySuccess("Copied!")
    setTimeout(() => setCopySuccess(""), 1000)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-orange-500' : 'bg-white text-gray-900'} w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8`}>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-center text-lg font-bold w-full'>Password Generator</h1>
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className={`${darkMode ? 'border-orange-500 text-orange-500' : 'border-gray-800 text-gray-800'} text-sm px-3 py-1 border rounded-md ml-2`}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="flex rounded-md overflow-hidden mb-4 bg-gray-700">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 bg-transparent text-orange-500"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 text-xl"
        >
          📋
        </button>
      </div>

      {copySuccess && <p className="text-green-400 text-sm mb-2">{copySuccess}</p>}

      <div className='flex text-sm gap-x-4 flex-wrap'>
        <div className='flex items-center gap-x-2'>
          <input
            type="range"
            min={6}
            max={15}
            value={length}
            className='cursor-pointer accent-orange-500'
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed(prev => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
