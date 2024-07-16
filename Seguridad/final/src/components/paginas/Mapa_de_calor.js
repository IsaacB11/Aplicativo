import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bubble } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useActivosContext } from '../../hooks/useActivosContext';

export default function Mapa_de_calor() {
  const { activos, dispatch } = useActivosContext();
  const [gauss, setGauss] = useState([]);

  const buildGauss = () => {
    let result = [];
    let auxUnicos = [];
    let auxDuplicados = new Set();

    activos.map((activo) => {
      if (activo.riesgo_potencial == 0 || activo.valor == 0) return;

      result.push({
        x: activo.riesgo_potencial,
        y: activo.valor,
        r: 10,
        text: 1
      });
    });

    result.forEach((bubble) => {
      const key = `${bubble.x}-${bubble.y}`;

      if (auxDuplicados.has(key)) {
        const b = auxUnicos.find((item) => item.x === bubble.x && item.y === bubble.y);

        if (b) {
          b.r += 5;
          b.text++;
        }
      } else {
        auxUnicos.push(bubble);
        auxDuplicados.add(key);
      }
    });

    setGauss(auxUnicos);
  };

  useEffect(() => {
    buildGauss();
  }, []);

  const data = {
    datasets: [
      {
        label: 'ACTIVOS',
        data: gauss,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Impacto',
          font: {
            size: 30
          }
        },
        beginAtZero: true,
        type: 'linear',
        min: 0,
        max: 6,
        stepSize: 1
      },
      y: {
        title: {
          display: true,
          text: 'Probabilidad',
          font: {
            size: 30
          }
        },
        beginAtZero: true,
        type: 'linear',
        min: 0,
        max: 6,
        stepSize: 1
      }
    },
    plugins: {
      datalabels: {
        anchor: function (context) {
          var value = context.dataset.data[context.dataIndex];
          return value.v < 50 ? 'end' : 'center';
        },
        align: function (context) {
          var value = context.dataset.data[context.dataIndex];
          return value.v < 50 ? 'end' : 'center';
        },
        color: function (context) {
          var value = context.dataset.data[context.dataIndex];
          return value.v < 50 ? context.dataset.backgroundColor : 'white';
        },
        font: {
          weight: 'bold'
        },
        formatter: (value, context) => {
          return value.text;
        },
      }
    }
  };

  useEffect(() => {

  }, [gauss]);

  return (
    <>
      <Bubble data={data} options={options} plugins={[ChartDataLabels]} />
    </>
  )
}
