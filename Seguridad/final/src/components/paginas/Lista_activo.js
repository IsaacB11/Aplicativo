
import 'styled-components'
import React, { useState, useEffect, useCallback } from 'react';
import DataTable, { createTheme } from 'react-data-table-component'
import { Link } from 'react-router-dom'
import Input from '../field/input/Input';

import { useActivosContext } from '../../hooks/useActivosContext';


const Inicio = () => {
    //1 Hooks

    const [users, setUsers] = useState([])
    const [amenazas, setAmenazas] = useState([])
    const [tipoAmenazas, setTipoAmenazas] = useState([])
    const [salvaguardas, setSalvaguardas] = useState([])
    const [amenazasPorTipo, setAmenazasPorTipo] = useState([])
    const { activos, dispatch } = useActivosContext();

    //2 Fetch de datos

    const URL = 'http://localhost:8000/activos'
    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setUsers(data.activos)
        dispatch({ type: 'SET', payload: data.activos});
    }

    const obtenerTipoAmenaza = useCallback(async () => {
        const response = await fetch('http://localhost:8000/tipo_amenaza')
        const json = await response.json();
        setTipoAmenazas(json.tipo_amenaza)
    }, [])

    const obtenerSalvaguardas = useCallback(async () => {
        const response = await fetch('http://localhost:8000/salvaguardas')
        const json = await response.json();
        setSalvaguardas(json.salvaguardas)
    }, [])

    const seleccionarSalvaguardas = useCallback( async (salvaguarda, id) =>{
        if (salvaguarda == "") return

        const response2 = await fetch('http://localhost:8000/impacto', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                id_activo: id,
                field: "id_salvaguardas",
                value: salvaguarda
            })
        })
    }, [])

    const obtenerAmenazas = useCallback(async () => {
        const response = await fetch('http://localhost:8000/amenazas')
        const json = await response.json();
        setAmenazas(json)  
    }, [])


    const seleccionarAmenaza = async (tipoAmenaza, id) => {
        if (tipoAmenaza == "") return

        var amenazasPorTipo = amenazas.filter(am => am.id_tipo_amenaza == tipoAmenaza)
        setAmenazasPorTipo(amenazasPorTipo)
        const response2 = fetch('http://localhost:8000/impacto', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                id_activo: id,
                field: "id_tipoamenaza",
                value: tipoAmenaza
            })
        })
    };

    const actualizarAmenaza = useCallback(async (amenaza, id) => {
        if (amenaza == "") return
        const response2 = await fetch('http://localhost:8000/impacto', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                id_activo: id,
                field: "id_amenaza",
                value: amenaza
            })
        })
    }, [])

    const eliminar = async id => {
        const response = await fetch(`http://localhost:8000/activos/${id}`, {
            method: "delete"
        });
        const json = await response.json();
        if (json) window.location.reload()
    }

    useEffect(() => {
        obtenerSalvaguardas();
    },[])

    useEffect(() => {
        obtenerTipoAmenaza();
        obtenerAmenazas();
    }, [obtenerTipoAmenaza])

    useEffect(() => {
        showData()
    }, [])
    

    //3 Columna del data table

    const columns = [
        {
            name: 'ID',
            selector: row => row.id
        },
        {
            name: 'Activo',
            selector: row => row.nombre
        },
        {
            name: 'Descripción',
            selector: row => row.descripcion
        },
        {
            name: 'Tipo de activo',
            selector: row => row.tipo_activo
        },
        {
            name: 'Confidencialidad',
            selector: row => row.confidencialidad
        },
        {
            name: 'Integridad',
            selector: row => row.integridad
        },
        {
            name: 'Disponibilidad',
            selector: row => row.disponibilidad
        },
        {
            name: 'Trazabilidad',
            selector: row => row.trazabilidad
        },
        {
            name: 'Autenticidad',
            selector: row => row.autenticidad
        },
        {
            name: 'Valor',
            selector: row => row.valor
        },
        {
            name: 'Tipo de amenaza',
            cell: row => (<select defaultValue={row.id_tipoamenaza} onChange={(e) => seleccionarAmenaza(e.target.value, row.id)}>
                <option value={""}>Seleccionar tipo de amenaza</option>
                {tipoAmenazas.map((tipo, key) =>
                    (<option value={tipo.id} key={key}>{tipo.nombre}</option>)
                )}
            </select>),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Salvaguardas',
            cell: row => (<select defaultValue={row.id_salvaguardas} onChange={(e) => seleccionarSalvaguardas(e.target.value, row.id)}>
                <option value={""}>Seleccionar Salvaguardas</option>
                {salvaguardas.map((tipo, key) =>
                    (<option value={tipo.id} key={key}>{tipo.nombre}</option>)
                )}
            </select>),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Amenaza',
            cell: row => (<select defaultValue={row.id_amenaza} onChange={(e) => actualizarAmenaza(e.target.value, row.id)}>
                <option>Seleccionar amenaza</option>+
                {amenazas.filter(am => am.id_tipo_amenaza == row.id_tipoamenaza).map((am, key) =>
                    (<option value={am.id} key={key}>{am.nombre}</option>)
                )}
            </select>),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Confidencialidad',
            cell: row => (<Input value={row.confidencialidadI} placeholder={"confidencialidad"} id={row.id} name={"confidencialidad"} />),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Integridad',
            cell: row => (<Input value={row.integridadI} placeholder={"integridad"} id={row.id} name={"integridad"} />),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Disponibilidad',
            cell: row => (<Input value={row.disponibilidadI} placeholder={"disponibilidad"} id={row.id} name={"disponibilidad"} />),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Riesgo potencial',
            selector: row => row.riesgo_potencial,
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Eliminar activo',
            cell: row => (<button type='button' onClick={() => eliminar(row.id)}>Eliminar</button>),
            style: {
                background: "#FF0000"
            }
        },
    ]



    //4 Mostrar datos 

    return (
        <div className="Inicio">

            <h1>Lista de activos</h1>
            <DataTable
                columns={columns}
                data={users}
                pagination
            />

            <div className='row'>
                <div className='col-2'>
                    <Link className="boton2 bg-dark" onClick={() => window.location.reload()}>Actualizar lista</Link>
                </div>
                <div className='col-2'>
                    <Link className="boton2 bg-dark" to="/Mapa_de_calor">Generar mapa de calor</Link>
                </div>
            </div>

        </div>

    )

}

export default Inicio