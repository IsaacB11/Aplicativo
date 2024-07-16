import 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';




const Agregar_amenaza = () => {
    const [amenazas, setAmenazas] = useState([])
    const [tipoAmenazas, setTipoAmenazas] = useState([])

    const obtenerTipoAmenaza = useCallback(async () => {
        const response = await fetch('http://localhost:8000/tipo_amenaza')
        const json = await response.json();
        setTipoAmenazas(json.tipo_amenaza)
    }, [])

    const seleccionarAmenaza = useCallback(async (e) => {
        const tipoAmenaza = e.target.value;
        const response = await fetch(`http://localhost:8000/amenaza/${tipoAmenaza}/tipo_amenaza`)
        const json = await response.json();
        setAmenazas(json.amenaza)
    }, [])


    useEffect(() => {
        obtenerTipoAmenaza();
    }, [obtenerTipoAmenaza])

    return (
        <div className="Inicio">

            <form>
                <div className='row g-3 mb-3'>
                    <div className='col'>
                        <select onChange={seleccionarAmenaza} className="form-control" name='nombre'>
                            <option>Seleccionar tipo de amenaza</option>
                            {tipoAmenazas.map((tipo, key) =>
                                (<option value={tipo.id} key={key}>{tipo.nombre}</option>)
                            )}
                        </select>
                    </div>
                    <div className='col'>
                        <select className="form-control" name='nombre'>
                            <option>Seleccionar amenaza</option>
                            {amenazas.map((am, key) =>
                                (<option key={key}>{am.nombre}</option>)
                            )}
                        </select>
                    </div>
                </div>
                <input className="boton" type='submit' value="Agregar activo" />
            </form>

        </div>

    )
}

export default Agregar_amenaza