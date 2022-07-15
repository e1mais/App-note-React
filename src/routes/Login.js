
/* eslint react/prop-types: 0 */
import { useState } from 'react'

export default function LoginForm ({ action }) {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const isRegister = () => {
    return action === 'Registrarse'
  }

  const handleChange = (e) => {
    setUser({ ...user, username: e.target.value })
  }

  const handleChangePass = e => {
    setUser({ ...user, password: e.target.value })
  }

  const handlePost = (e) => {
    e.preventDefault()
    const url = !isRegister ? 'http://localhost:8000/user/singin' : 'http://localhost:8000/user/login'

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then((token) => {
        window.localStorage.setItem('access_token', token['access token'])
        window.location.replace('/notes')
      })
  }
  return (
    <section>
      <h3>{action}</h3>
    <form onSubmit={handlePost}>
      <label htmlFor="username">Nombre de Usuario</label><br />
      <input type="text" name="username" onChange={handleChange}/> <br />
      <label htmlFor="password">Contraseña</label><br />
      <input type="password" name="password" onChange={handleChangePass}/>
      <button>Iniciar Sesión</button>
    </form>
  </section>
  )
}
