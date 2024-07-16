import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navegacion/Navbar.js'
import Eliminar_activo from './components/paginas/Eliminar_activo.js'
import Agregar_activo from './components/paginas/Agregar_activo.js'
import Agregar_amenaza from './components/paginas/Agregar_amenaza.js'
import Inicio from './components/paginas/Inicio.js'
import Lista_activo from './components/paginas/Lista_activo'
import Mapa_de_calor from './components/paginas/Mapa_de_calor';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/Eliminar_activo' Component={Eliminar_activo}/>
        <Route path='/Agregar_activo' Component={Agregar_activo}/>
        <Route path='/Agregar_amenaza' Component={Agregar_amenaza}/>
        <Route path='/' Component={Inicio}/>
        <Route path='/Lista_activo' Component={Lista_activo}/>
        <Route path='/Mapa_de_calor' Component={Mapa_de_calor}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
