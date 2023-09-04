import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("");

  //ref hooks

  const passRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy'
    if(numberAllowed){
      str += "0123456789"
    }
    if(characterAllowed){
    str += "!@#$$%^&*(){}?~+-:=+" //
    }
    for (let i=0; i <= length; i++) {
      let char  = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
}
    setPassword(pass);
  },[length,numberAllowed,characterAllowed,setPassword])


  const copyPasswordToClipboard = useCallback(() => {
      window.navigator.clipboard.writeText(password)
  },[password])

    useEffect(() => {
      passwordGenerator();
    }, [length,numberAllowed,passwordGenerator,characterAllowed]);

  return (
    <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4
        my-[5rem] text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center '>
          Password Generators
        </h1>
            
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                  <input
                  value={password} 
                  className='outline-none w-full py-1 px-3'
                  placeholder='Password'
                  readOnly
                  ref={passRef} 
                  type="text" />
                 
                  <button onClick={copyPasswordToClipboard}  className='outline-none bg-blue-700 text-white
                   px-3 py-0.5 shrink-0'>Copy</button>
            </div>
            <div className='flex text-sm gap-x-2'>
                <div className='flex items-center gap-x-1'>
                    <input type="range"
                    min={6}
                    max={100}
                    value={length}
                    className='cursor-pointer'
                    onChange={(e) => {setLength(e.target.value);}}

                    />
                    <label htmlFor=""> Length:{length}</label>
                </div>
                <div className='flex items-center gap-x-1'>
                  <input type="checkbox"
                      id='numberInput'  
                      className='cursor-pointer'
                      onChange={() => {setNumberAllowed((prev) => !prev)}}
                      />
                      <label htmlFor="numberInput"> Numbers</label>

                </div>
                <div className='flex items-center gap-x-1'>
                  <input type="checkbox"
                      id='characterInput'  
                      className='cursor-pointer'
                      defaultChecked={characterAllowed}
                      onChange={() => {setCharacterAllowed((prev) => !prev)}}
                      />
                      <label htmlFor="numberInput">  Characters</label>

                </div>
            </div>
        </div>
    </>
  )
}

export default App
