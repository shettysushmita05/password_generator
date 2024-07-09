import {useState,useCallback, useEffect,useRef} from 'react';


function App() {
  const [length, setlength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [character,setCharacter]=useState(false)
  const [password,setPassword]=useState("")

  //useref hook:- it  will give reference and we can take any reference and manipulate it 
  const passwordRef=useRef(null)


  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str+="0123456789"
    if (character) str+="!@#$%^&*_+-=[]{}~`"

    for (let i=1; i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass);

  },[length,numberAllowed,character,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
  },[password])


  //useeffects :- when the page gets loaded for the first time it gets called at that time and if there is any changes done in the dependency array then it will get rerun
useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,character,passwordGenerator])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className='text-white text-center my-3'>
        Password generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px3'
        placeholder='Password'
        readOnly
        ref={passwordRef}

        />
        <button  
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className='flex item-center gap-x-1' >
          <input
          type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer' 
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev)=> !prev);
            }}
          />
          <label htmlFor='numberInput'>Number</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={character}
          id='characterInput'
          onChange={()=>{
            setCharacter((prev)=> !prev);
            }}
          />
          <label htmlFor='characterInput'>Character</label>

        </div>
      </div>
    </div>
    </>
  )
}

export default App;
