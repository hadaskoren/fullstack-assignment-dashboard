import React, {useState, useEffect} from 'react';
import './App.css';
import MaliciousDAppsTable from "./components/MaliciousDAppsTable.jsx";
import NavBar from "./components/NavBar.jsx";
import TimeRange from "./components/TimeRangePicker.js";
import StackedBarChartWithLatency from "./components/StackedBarChart.jsx";
import PieChart from "./components/PieChart.jsx";

function App() {
  const [date, setDate] = useState({startDate: '2024-03-11T14:28:00Z', endDate: '2024-03-14T14:28:32Z'})
  const [allData, setAllData] = useState([])
  const [maliciousData, setMaliciousData] = useState([])
  const [benignData, setBenignData] = useState([])
  const [maliciousURLCounts, setMaliciousURLCounts] = useState({});
  const [sortedMaliciousURLs, setSortedMaliciousURLs] = useState([]);

  useEffect(() => {
    const urls = {};
    maliciousData.forEach(dataItem => {
      if (dataItem.IS_MALICIOUS === "true") {
        urls[dataItem.URL] = (urls[dataItem.URL] || 0) + 1;
      }
    });
    setMaliciousURLCounts(urls);
  }, [maliciousData]);

  useEffect(() => {
    setSortedMaliciousURLs(Object.entries(maliciousURLCounts).sort((a, b) => b[1] - a[1]));
  }, [maliciousURLCounts]);

  useEffect(() => {
    const url = `http://localhost:3002/api/results?start=${date.startDate}&end=${date.endDate}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setAllData(data)
        const onlyMaliciousData = data.filter(dataItem => {
          return dataItem.IS_MALICIOUS === "true"
        })
        const onlyBenignData = data.filter(dataItem => {
          return dataItem.IS_MALICIOUS === "false"
        })
        setMaliciousData(onlyMaliciousData);
        setBenignData(onlyBenignData)
      })
      .catch(err => {
        console.error('-----error=', err);
      });
  }, [date]);

  return (
    <div>
      <NavBar />
      <main className="flex flex-col justify-center align-center">
        <h1 className="flex justify-center mt-10 font-extrabold">Malicious and benign sites data</h1>
        <TimeRange date={date} onTimeChange={(newStartDate, newEndDate) => setDate({
          startDate: newStartDate,
          endDate: newEndDate
        })}/>
        {allData.length > 0 ? (
          <>
            <PieChart maliciousDataAmount={maliciousData.length} benignDataAmount={benignData.length}/>
            <StackedBarChartWithLatency data={allData}/>
            <MaliciousDAppsTable top10Malicious={sortedMaliciousURLs.slice(0, 10)} />
          </>
        ) : <p className="text-red-700 flex justify-center mt-5">No data for these dates, please choose again.</p>}

      </main>
    </div>
  );
}

export default App;
