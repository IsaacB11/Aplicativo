import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to=''>
            <img src='./logo_ucc_2018(CURVAS)-01.png' width='150' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to='/'>Lista de activos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/Lista_activo'>Editar activos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/Agregar_activo'>Agregar activos</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to='/Agregar_amenaza'>Agregar amenaza</Link>
              </li> */}
               {/* <li className="nav-item">
                <Link className="nav-link" to='/Mapa_de_calor'>Mapa de calor</Link>
              </li>  */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar