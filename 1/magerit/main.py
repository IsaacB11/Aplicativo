from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from Database import Database
from Model import Process, ProcessRequest, ProcessActive, ActivoRequest, ImpactoRequest, FieldRequest
import plotly.io as pio
import plotly.express as px
from fastapi.responses import HTMLResponse
from PIL import Image
import io


app = FastAPI()
db = Database()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    db.connect(user="postgres", password="123", host="localhost", port="5432", database="magerit")

@app.on_event("shutdown")
async def shutdown_db_client():
    db.close()

@app.post("/process")
async def create_item(processRequest: ProcessRequest):
    try:
        item_id = db.create_item(processRequest)
        for process in processRequest.activos:
            db.create_activo_proceso(process, item_id)


        return {"id": item_id, "process": process}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/activos")
async def add_activos(activo: ActivoRequest):
    try:
        id = db.create_activo(activo) 
        return{"success":True,"id":id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/activos")
async def read_items():
    items = db.get_all_activos()
    return {"activos": items}

@app.delete("/activos/{id}")
async def deleteActivo(id:int):
    return db.deleteActivo(id)

@app.get("/tipo_amenaza")
async def read_tipo_amenaza():
    items = db.get_all_tipo_amenaza()
    return {"tipo_amenaza": items}


@app.get("/salvaguardas")
async def read_salvaguardas():
    items = db.get_all_salvaguardas()
    return {"salvaguardas": items}


@app.get("/amenaza/{id_tipo}/tipo_amenaza")
async def read_amenaza_por_tipo(id_tipo: str):
    items = db.get_all_amenaza_por_tipo(id_tipo)
    return {"amenaza": items}

@app.get("/activos/process/{id_process}")
async def read_items(id_process: int):
    items = db.get_activos_por_proceceso(id_process)
    return {"activos": items}


@app.post("/impacto")
async def crear_impacto(impacto: ImpactoRequest):
    return db.createImpacto(impacto)


@app.put("/impacto")
async def actualizarImpacto(field: FieldRequest):
    try:
        impacto = db.getImpactoByActivo(field.id_activo)
        setattr(impacto,field.field,field.value)
        return db.updateImpacto(impacto)
    except Exception as e: 
        raise HTTPException(500, str(e))


@app.get("/amenazas")
async def obtenerAmenazas():
    return db.get_all_amenaza()









@app.post("/generar_pdf/")
async def generar_pdf():
    pdf = db.create_map()
    return pdf

@app.put("/process/{id_process_active}/activo")
async def create_item(id_process_active: int, processRequest: ProcessActive):
    try:
        db.update_process_activo(id_process_active, processRequest.confidencialidad, processRequest.integridad, processRequest.disponibilidad)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/", response_class=HTMLResponse)
async def get_heatmap(request: Request):
    # Datos de ejemplo para el mapa de calor (reemplázalos con tus propios datos)
    fig = px.imshow([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

    # Personaliza el diseño del mapa de calor si es necesario
    fig.update_layout(
        title='Mapa de Calor Magerit',
        xaxis_title='Eje X',
        yaxis_title='Eje Y'
    )

    # Convierte el gráfico en HTML
    heatmap_html = pio.to_html(fig, full_html=False)

    return f"""
    <html>
    <head>
        <title>Mapa de Calor Magerit</title>
    </head>
    <body>
        {heatmap_html}
    </body>
    </html>
    """
@app.get("/heatmap")
async def get_heatmap():
    # Datos de ejemplo para el mapa de calor (reemplázalos con tus propios datos)
    fig = px.imshow([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

    # Personaliza el diseño del mapa de calor si es necesario
    fig.update_layout(
        title='Mapa de Calor Magerit',
        xaxis_title='Probabilidad',
        yaxis_title='Impacto'
    )

    # Convierte el gráfico en una imagen
    img_bytes = pio.to_image(fig, format="png")
    img = Image.open(io.BytesIO(img_bytes))

    # Define la ruta donde quieres guardar la imagen
    ruta_guardado = "mapa_de_calor.png"

    # Guarda la imagen en la ruta especificada
    img.save(ruta_guardado, format="PNG")

    return {"mensaje": f"Imagen guardada en {ruta_guardado}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)