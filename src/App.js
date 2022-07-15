
import { Link } from 'react-router-dom'
import { IoMdTrash } from 'react-icons/io'
import useNotes from './hooks/useNotes'
import AppBar from './Components/AppBar'
import { useState, useCallback } from 'react'

function App () {
  const [post, setPost] = useState({
    name: '',
    content: ''
  })

  const handleChangeName = (e) => {
    setPost({ ...post, name: e.target.value })
  }

  const handleChangeTextArea = (e) => {
    setPost({ ...post, content: e.target.value })
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    fetch('http://localhost:8000/notes', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(post)
    })
  })
  const { notes } = useNotes(handleSubmit)

  return (
    <div className="App">
      <AppBar login={'../login'} logup={'../logup'}></AppBar>
      <div className="container">
        <section className="container-item">
          <h1>Aplicación de Notas</h1>

          <div className="buttons">
            <form onSubmit={handleSubmit} className='form-note'>
            <input type="text" placeholder='Nombre de la nota' className='input-form-note' onChange={handleChangeName}/>
              <textarea name="content" cols="30" rows="10" placeholder='Contenido de la nota' className='input-form-note text-area' onChange={handleChangeTextArea} />
              <button>Crear</button>
            </form>
          </div>
        </section>

        <section className="notes">
          {notes.map(note => {
            return (
              <div key={note.id} className='each-note'>
              <Link to={`/notes/${note.id}`}>{note.id}.{note.name}</Link>
            </div>)
          })}
        </section>
      </div>
    </div>
  )
}

export default App
