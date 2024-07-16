from pydantic import BaseModel
from typing import Optional, Union


class Activo:
    def __init__(self, id, nombre, descripcion, tipo_activo, confidencialidad, integridad, disponibilidad, trazabilidad,
                 autenticidad, valor, confidencialidadI, integridadI, disponibilidadI, riesgo_potencial, id_amenaza, id_tipoamenaza, id_salvaguardas):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
        self.tipo_activo = tipo_activo
        self.confidencialidad = confidencialidad
        self.integridad = integridad
        self.disponibilidad = disponibilidad
        self.trazabilidad = trazabilidad
        self.autenticidad = autenticidad
        self.valor = valor
        self.confidencialidadI = confidencialidadI
        self.integridadI = integridadI
        self.disponibilidadI = disponibilidadI
        self.riesgo_potencial = riesgo_potencial
        self.id_amenaza = id_amenaza
        self.id_tipoamenaza = id_tipoamenaza
        self.id_salvaguardas = id_salvaguardas


class ActivoAmenaza:
    def __init__(self, id, nombre, descripcion, tipo_activo, confidencialidad, integridad, disponibilidad, trazabilidad,
                 autenticidad, valor, id_amenaza, nombre_amenaza, id_process_active, id_salvaguardas):
        self.id = id
        self.nombre = nombre
        self.descripcion = descripcion
        self.tipo_activo = tipo_activo
        self.confidencialidad = confidencialidad
        self.integridad = integridad
        self.disponibilidad = disponibilidad
        self.trazabilidad = trazabilidad
        self.autenticidad = autenticidad
        self.id_amenaza = id_amenaza
        self.nombre_amenaza = nombre_amenaza
        self.id_process_active = id_process_active
        self.id_salvaguardas = id_salvaguardas


class TipoAmenaza:
    def __init__(self, id, nombre):
        self.id = id
        self.nombre = nombre

class Salvaguardas:
    def __init__(self, id, nombre):
        self.id = id
        self.nombre = nombre

class Amenaza:
    def __init__(self, id, nombre, id_tipo_amenaza):
        self.id = id
        self.nombre = nombre
        self.id_tipo_amenaza = id_tipo_amenaza

class Impacto:
    def __init__(self, id, confidencialidad, integridad, disponibilidad, riesgo_potencial, id_activo, id_amenaza, id_tipoamenaza, id_salvaguardas):
        self.id = id
        self.confidencialidad = confidencialidad
        self.integridad = integridad
        self.disponibilidad = disponibilidad
        self.riesgo_potencial = riesgo_potencial
        self.id_activo = id_activo
        self.id_amenaza = id_amenaza
        self.id_tipoamenaza = id_tipoamenaza
        self.id_salvaguardas = id_salvaguardas

class ProcessRequest(BaseModel):
    id: int
    usuario: str
    activos: list = []

    def add_processes(self, activos):
        self.processes.extend(activos)

    def get_processes(self):
        return self.activos


class Process(BaseModel):
    id: int
    id_activo: int
    id_tipo_amenaza: int
    id_amenaza: int


class ProcessActive(BaseModel):
    confidencialidad: int
    integridad: int
    disponibilidad: int

class ActivoRequest(BaseModel):
    nombre: str
    descripcion: str
    tipo_activo: str
    confidencialidad: int
    integridad: int
    disponibilidad: int
    trazabilidad: int
    autenticidad: int

class ImpactoRequest(BaseModel):
    confidencialidad: int 
    integridad: int 
    disponibilidad: int 
    id_activo: int
    id_amenaza: Optional[int]
    id_tipoamenaza: Optional[int]
    id_salvaguardas: Optional[int]

class FieldRequest(BaseModel):
    field: Union[int, str]
    value: Union[int, str]
    id_activo: Union[int, str]


