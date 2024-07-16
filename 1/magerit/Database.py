import psycopg2
from Model import Activo, TipoAmenaza, ActivoAmenaza, Impacto, Amenaza, Salvaguardas
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pdfkit


class Database:
    def __init__(self):
        self.connection = None

    def connect(self, user, password, host, port, database):
        self.connection = psycopg2.connect(
            user=user,
            password=password,
            host=host,
            port=port,
            database=database
        )

    def close(self):
        if self.connection:
            self.connection.close()

    def create_item(self, process):
        cursor = self.connection.cursor()
        #cursor.execute("INSERT INTO process (id_activo, id_amenaza, value) VALUES (%s) RETURNING id;", (process.id_activo, process.id_amenaza, process.value))
        cursor.execute("INSERT INTO process (usuario) VALUES (%s) RETURNING id;", (process.usuario,))
        id = cursor.fetchone()[0]
        self.connection.commit()
        cursor.close()
        return id
    
    def create_activo(self, activo):
        valor = (int(activo.confidencialidad) + int(activo.integridad) + int(activo.disponibilidad) + int(activo.trazabilidad) + int(activo.autenticidad)) // 5
        cursor = self.connection.cursor()
        cursor.execute("INSERT INTO activo (nombre, descripcion, tipo_activo, confidencialidad, integridad, disponibilidad, trazabilidad, autenticidad, valor) values (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id", (activo.nombre,activo.descripcion,activo.tipo_activo,activo.confidencialidad,activo.integridad,activo.disponibilidad,activo.trazabilidad,activo.autenticidad,valor))
        id = cursor.fetchone()[0]
        self.connection.commit()
        cursor.close()
        return id

    def create_activo_proceso(self, process, id_process):
        cursor = self.connection.cursor()
        #cursor.execute("INSERT INTO process (id_activo, id_amenaza, value) VALUES (%s) RETURNING id;", (process.id_activo, process.id_amenaza, process.value))
        cursor.execute("INSERT INTO activo_proceso (id_activo, id_proceso, id_amenaza, id_tipo_amenaza) VALUES (%s, %s, %s, %s) RETURNING id;", (process['id_activo'], id_process, process['id_amenaza'], process['id_tipo_amenaza'],))
        id = cursor.fetchone()[0]
        self.connection.commit()
        cursor.close()
        return id

    def get_all_activos(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM activo a inner join impacto im on a.id=im.id_activo;")
        items = cursor.fetchall()
        cursor.close()
        activos = [Activo(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[11], row[12], row[13], row[14], row[16], row[17], row[18]) for row in items]
        return activos

    def get_all_tipo_amenaza(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM tipo_amenaza;")
        items = cursor.fetchall()
        cursor.close()
        activos = [TipoAmenaza(row[0], row[1]) for row in items]
        return activos
    

    def get_all_salvaguardas(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM salvaguardas;")
        items = cursor.fetchall()
        cursor.close()
        activos = [Salvaguardas(row[0], row[1]) for row in items]
        return activos


    
    def get_all_amenaza(self):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM amenza")
        items = cursor.fetchall()
        cursor.close()
        activos = [Amenaza(row[0], row[1], row[2]) for row in items]
        return activos

    def get_all_amenaza_por_tipo(self, id_tipo):
        cursor = self.connection.cursor()
        cursor.execute("SELECT a.id, a.nombre FROM amenza a INNER JOIN tipo_amenaza ta ON a.id_tipo_amenaza= ta.id and ta.id = %s;",
                       id_tipo)
        items = cursor.fetchall()
        cursor.close()
        activos = [TipoAmenaza(row[0], row[1]) for row in items]
        return activos

    def get_activos_por_proceceso(self, id_process):
        try:
            cursor = self.connection.cursor()
            cursor.execute("SELECT a.id, a.nombre , a.descripcion , a.tipo_activo, a.confidencialidad, a.integridad, a.disponibilidad, a.trazabilidad, a.autenticidad, a.valor, ap.id_amenaza, am.nombre, ap.id "
                           "FROM activo a INNER JOIN activo_proceso ap ON a.id = ap.id_activo INNER JOIN amenza am on am.id = ap.id_amenaza WHERE ap.id_proceso = %s;",
                           (id_process,))
            items = cursor.fetchall()
            cursor.close()
            activos = [ActivoAmenaza(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12]) for row in items]
            return activos
        except ValueError as e:
            print(e)

    def update_process_activo(self, id_activo, confidencialidad, integridad, disponibilidad):
        cursor = self.connection.cursor()
        cursor.execute("UPDATE activo_proceso SET confidencialidad = %s, integridad = %s, disponibilidad = %s WHERE id = %s;", (confidencialidad, integridad, disponibilidad, id_activo))
        self.connection.commit()
        cursor.close()

    def delete_item(self, item_id):
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM items WHERE id = %s;", (item_id,))
        self.connection.commit()
        cursor.close()

    

    def getImpactoByActivo(self, id_activo):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * from impacto WHERE id_activo = %s", (id_activo,))
        impacto = cursor.fetchone()
        self.connection.commit()
        cursor.close()
        return Impacto(impacto[0],impacto[1],impacto[2],impacto[3],impacto[4],impacto[5],impacto[6],impacto[7], impacto[8])

    def createImpacto(self, impacto):
        cursor = self.connection.cursor()
        cursor.execute("INSERT INTO impacto (confidencialidad, integridad, disponibilidad, riesgo_potencial, id_activo, id_amenaza, id_tipoamenaza, id_salvaguardas) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)", (impacto.confidencialidad,impacto.integridad,impacto.disponibilidad,0,impacto.id_activo,impacto.id_amenaza,impacto.id_tipoamenaza, impacto.id_salvaguardas))
        self.connection.commit()
        cursor.close()
        return True

    def updateImpacto(self, impacto):
        riesgo = (impacto.confidencialidad + impacto.integridad + impacto.disponibilidad) // 3
        cursor = self.connection.cursor()
        cursor.execute("UPDATE impacto set confidencialidad=%s,integridad=%s,disponibilidad=%s, riesgo_potencial=%s, id_amenaza=%s,id_tipoamenaza=%s,id_salvaguardas=%s WHERE id=%s",(impacto.confidencialidad,impacto.integridad,impacto.disponibilidad,riesgo,impacto.id_amenaza,impacto.id_tipoamenaza,impacto.id_salvaguardas,impacto.id))
        self.connection.commit()
        cursor.close()
        return True
    
    def deleteActivo(self, id):
        cursor = self.connection.cursor()
        cursor.execute("DELETE FROM impacto WHERE id_activo = %s",(id,))
        cursor.execute("DELETE FROM activo WHERE id = %s",(id,))
        self.connection.commit()
        cursor.close()
        return True













    def create_map(self):
        # Crear datos de ejemplo
        data = np.random.rand(10, 10)  # Matriz de datos aleatorios de 10x10

        # Crear el mapa de calor
        sns.heatmap(data, annot=True, cmap='viridis')

        # Guardar la imagen temporalmente
        plt.savefig('mapa_de_calor.png')
        plt.close()

        # Convertir la imagen a PDF
        pdf = pdfkit.from_file('mapa_de_calor.png', False)

        # Eliminar la imagen temporal
        import os
        os.remove('mapa_de_calor.png')

        # Devolver el PDF
        return pdf


