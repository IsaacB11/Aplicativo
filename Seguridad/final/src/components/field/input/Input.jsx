import React from 'react'

export default function Input({ placeholder, value, id, name }) {
    const guardar = async (e) => {
        if (e.target.value == "") return
        console.log(e.target.value)
        const value = parseInt(e.target.value);
        const response = await fetch('http://localhost:8000/impacto', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                id_activo: id,
                field: name, 
                value
            })
        })
    }
    return (
        <input placeholder={placeholder} defaultValue={value} onChange={guardar} />
    )
}
