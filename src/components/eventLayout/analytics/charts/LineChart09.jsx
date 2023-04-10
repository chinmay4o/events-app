import React, { useRef, useEffect } from 'react';

import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { formatValue } from '../../../../utils/Utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function LineChart09({
  data,
  width,
  height,
  toolTip
}) {

  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            type: 'linear',
            display: false,
            // grace: '5%'
          },
          // x: {
          //   type: 'time',
          //   time: {
          //     parser: 'MM-DD-YYYY',
          //     unit: 'month',
          //   },
          //   display: false,
          // },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => toolTip, // Disable tooltip title
              label: (context) => context.parsed.y,
            },
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        maintainAspectRatio: false,
      },
    });
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.datasets[0].data]);

  return (
    <canvas ref={canvas} width={width} height={height}></canvas>
  );
}

export default LineChart09;