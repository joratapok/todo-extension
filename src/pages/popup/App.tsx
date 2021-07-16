import React, { useState } from 'react'
import { useGetFromStorage } from '../../hooks/useGetFromStorage'

const App = (): JSX.Element => {
  const [newTodo, setNewTodo] = useState('')
  const allTodos: Array<string> | undefined = useGetFromStorage()

  const saveTodo = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTodo(e.currentTarget.value)
  }
  const sendTodo = () => {
    chrome.runtime.sendMessage({ todo: newTodo }, function() {})
    setNewTodo('')
  }
  const removeTodo = (index: number) => {
    chrome.runtime.sendMessage({ removeTodo: index }, function() {})
    setNewTodo('')
  }

  return (

    <div className="quote">
      <h1 style={{ background: 'blue' }}>Todos</h1>
      <input type="text" value={newTodo} onChange={saveTodo}/>
      <button onClick={() => sendTodo()} disabled={!newTodo}>Send Message</button>
      {allTodos && allTodos.map((el, index) => {
        return <p key={index}>{el}
        <button onClick={() => removeTodo(index)}>X</button>
        </p>
      })}
    </div>
  )
}

export default App
