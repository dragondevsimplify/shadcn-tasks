import './App.css'
import { Button } from '@/components/ui/button'
import { MouseEvent } from "react";

function App() {
  function submit(e: MouseEvent<HTMLButtonElement>) {
    console.log(e)
    console.log(123)
  }
  
  return (
    <>
      <Button onClick={(e) => submit(e)}>Click me</Button>
      <div>Hello</div>
      <p className='mt-3'>ABC</p>
    </>
  )
}

export default App
