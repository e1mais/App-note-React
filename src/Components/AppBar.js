import { Link } from 'react-router-dom'

export default function AppBar ({ login, logup }) {
  return (
    <>
      <nav className="app-bar">
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/227/227104.png" alt="Lapíz" />
        </div>
        <div className="divider">
          <Link to={logup}>Registrarse</Link>
          <Link to={login}>Iniciar Sesión</Link>
        </div>
      </nav>
    </>
  )
}
