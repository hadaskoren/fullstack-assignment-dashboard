import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const StackedBarChart = ({ data }) => {
  const [timeUnit, setTimeUnit] = useState('hour');
  const [sortedTimeToData, setSortedTimeToData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getLabelsWithData = useCallback(() => {
    let tempTimeToData = {};
    data.forEach(obj => {
      const date = new Date(obj.STARTED_AT);
      let label = '';
      switch (timeUnit) {
        case 'second':
          label = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          break;
        case 'minute':
          label = `${date.getHours()}:${date.getMinutes()}`;
          break;
        case 'hour':
          label = `${date.getHours()}h`;
          break;
        case 'day':
          label = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          break;
        default:
          label = `${date.getHours()}h`;
      }

      tempTimeToData[label] = tempTimeToData[label] || {malicious: 0, benign: 0, totalLatency: 0, count: 0};
      if (obj.IS_MALICIOUS === 'true') {
        tempTimeToData[label].malicious += 1;
      } else {
        tempTimeToData[label].benign += 1;
      }
      tempTimeToData[label].totalLatency += obj.LATENCY;
      tempTimeToData[label].count += 1;
    });

    const sortedData = Object.entries(tempTimeToData)
      .sort(([labelA], [labelB]) => labelA.localeCompare(labelB))
      .map(([label, data]) => ({
        label,
        malicious: data.malicious,
        benign: data.benign,
        averageLatency: data.totalLatency / data.count
      }));

    setSortedTimeToData(sortedData);
  }, [timeUnit, data]);

  useEffect(() => {
    getLabelsWithData();
  }, [getLabelsWithData]);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedTimeToData.map(item => item.label),
        datasets: [{
          label: 'Malicious',
          data: sortedTimeToData.map(item => item.malicious),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        }, {
          label: 'Benign',
          data: sortedTimeToData.map(item => item.benign),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }, {
          label: 'Average Latency',
          data: sortedTimeToData.map(item => item.averageLatency),
          type: 'line',
          borderColor: 'rgba(255, 206, 86, 1)',
          fill: false,
        }]
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          }
        }
      }
    });
  }, [sortedTimeToData]);

  return (
    <div className="flex flex-col w-full mt-12">
      <div className="flex flex-col w-[600px] m-auto overflow-x-auto">
        <h2 className="flex justify-center mb-5">Breakdown by time</h2>
        <div className="flex">
          <label htmlFor="timeUnit" className="mr-5">Select Time Unit:</label>
          <select id="timeUnit" value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
            <option value="second">Second</option>
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
          </select>
        </div>
        <canvas ref={chartRef} id="stackedBarChart"></canvas>
      </div>
    </div>)
}

export default StackedBarChart;
