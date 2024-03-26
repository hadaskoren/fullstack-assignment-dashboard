import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PieChart = ({ maliciousDataAmount, benignDataAmount }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Malicious', 'Benign'],
        datasets: [{
          data: [maliciousDataAmount, benignDataAmount],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        }]
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [maliciousDataAmount, benignDataAmount]);

  return (
    <div className="flex justify-center w-full my-12">
      <div className="w-[400px]">
        <h2 className="flex justify-center mb-5">Total number of malicious VS benign requests</h2>
        <canvas ref={chartRef} id="pieChart"></canvas>
      </div>
    </div>
  );
};

export default PieChart;
