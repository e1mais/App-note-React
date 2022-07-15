import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../index.css'

export default function Note () {
  const params = useParams()
  const [note, setNote] = useState({})
  const [text, setText] = useState({
    name: '',
    content: ''
  })
  useEffect(() => {
    fetch(`http://localhost:8000/notes/${parseInt(params.noteId, 10)}`)
      .then(response => response.json())
      .then(setNote)
      .catch(err => console.error(err))
  }, [params.noteId])

  useEffect(() => {
    setText({ name: note.name, content: note.content })
  }, [note])

  const handleChangeName = (e) => {
    setText({ ...text, name: e.target.value })
  }

  const handleChangeContent = (e) => {
    setText({ ...text, content: e.target.value })
  }

  const handlePutNote = (e) => {
    e.preventDefault()
    console.log(text)
    fetch(`http://localhost:8000/notes/${params.noteId}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(text)
    }).then(window.location.replace('/notes'))
  }

  const handleDeleteNote = () => {
    fetch(`http://localhost:8000/notes/${params.noteId}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('access_item')}`
      }
    }).then(() => { window.location.replace('/notes') })
  }

  return (
    <section className='container-item text-area'>
      <h3>Nota número {note.id}</h3>
      <form onSubmit={handlePutNote}>
      <input value={text?.name} onChange={handleChangeName}/>
        <textarea name="content" cols="30" rows="10" value={text?.content} onChange={handleChangeContent}/>
        <button>Guardar</button>
      </form>
      <button onClick={handleDeleteNote}>Eliminar</button>
  </section>
  )
}
