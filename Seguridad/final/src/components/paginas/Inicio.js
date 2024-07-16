
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

    const obtenerAmenazas = useCallback(async () => {
        const response = await fetch('http://localhost:8000/amenazas')
        const json = await response.json();
        setAmenazas(json)  
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
        obtenerTipoAmenaza();
        obtenerAmenazas();
        obtenerSalvaguardas();
    }, [obtenerTipoAmenaza])

    useEffect(() => {
        showData()
    }, [])
    

    //3 Columna del data table

    const columns = [
        {
            name: 'Activo',
            selector: row => row.nombre,
            style: {
                width: '300px',
            }
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
            cell: row => {
                const tipo = tipoAmenazas.filter((t) => t.id == row.id_tipoamenaza)[0];
                return (tipo != undefined) ? tipo.nombre : '';
            }
        },
        {
            name: 'Amenaza',
            cell: row => {
                const am = amenazas.filter((a) => a.id == row.id_amenaza)[0]
                return (am != undefined) ? am.nombre : '';
            }
        },
        {
            name: 'Salvaguardas',
            cell: row => {
                const am = salvaguardas.filter((a) => a.id == row.id_salvaguardas)[0]
                return (am != undefined) ? am.nombre : '';
            },
            style: {
                background: "#E3FD50"
            }
        },
        {
            name: 'Confidencialidad',
            cell: row => (row.confidencialidadI),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Integridad',
            cell: row => (row.integridadI),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Disponibilidad',
            cell: row => (row.disponibilidadI),
            style: {
                background: "#E97E7E"
            }
        },
        {
            name: 'Riesgo potencial',
            selector: row => row.riesgo_potencial,
            style: {
                background: "#FA3C3C"
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
                    <Link className="boton2 bg-dark" to="/Agregar_activo" >Agregar activo</Link>
                </div>
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