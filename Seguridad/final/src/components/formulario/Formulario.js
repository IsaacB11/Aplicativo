import React from 'react'
import { useForm } from 'react-hook-form'


const Formulario = () => {

  const { register, handleSubmit } = useForm();

  const crearImpacto = async id => {
    const response = await fetch('http://localhost:8000/impacto', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        confidencialidad: 0,
        integridad: 0,
        disponibilidad: 0,
        id_activo: id,
        id_amenaza: null,
        id_tipoamenaza: null,
        id_salvaguardas: null
      })
    });
    const json = await response.json();
    return json
  }

  const guardar = async data => {

    const response = await fetch('http://localhost:8000/activos', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(data)
    });
    const { success, id } = await response.json();
    if (success) {
      await crearImpacto(id);
      window.location.reload();
    }
  };

  return (
    <section className="form-register bg-dark">
      <h4>ACTIVOS</h4>
      <div>
        <form onSubmit={handleSubmit(guardar)}>
          <div className='row g-3 mb-3'>
            <div className='col'>
              <input className="form-control" type='text' placeholder='Activo' name='nombre' {...register("nombre")}></input>
            </div>
          </div>
          <div className='row g-3 mb-3'>
            <div className='col'>
              <textarea className="form-control" type='text' placeholder='Descripción del activo' name='descripcion' {...register("descripcion")}></textarea>
            </div>
          </div>
          <div className='row g-3 mb-3'>
            <div className='col'>
              <input className="form-control" type='text' placeholder='Tipo de activo' name='tipo_activo' {...register("tipo_activo")}></input>
            </div>
          </div>
          <div className='row g-3 mb-3'>
            <div className='col'>
              <input className="form-control" type='text' placeholder='Confidencialidad' name='confidencialidad' {...register("confidencialidad")}></input>
            </div>
            <div className='col'>
              <input className="form-control" type='text' id='ejemplo' placeholder='Integridad' name='integridad' {...register("integridad")}></input>
            </div>
          </div>
          <div className='row g-3 mb-3'>
            <div className='col'>
              <input className="form-control" type='text' placeholder='Disponibilidad' name='disponibilidad' {...register("disponibilidad")}></input>
            </div>
            <div className='col'>
              <input className="form-control" type='text' placeholder='Trazabilidad' name='trazabilidad' {...register("trazabilidad")}></input>
            </div>
          </div>
          <div className='row g-3'>
            <div className='col'>
              <input className="form-control" type='text' placeholder='Autenticidad' name='autenticidad' {...register("autenticidad")}></input>
            </div>
          </div>
          <input className="boton" type='submit' value="Agregar activo" />
        </form>
      </div>
    </section>
  )
}

export default Formulario