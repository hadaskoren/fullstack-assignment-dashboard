const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3002;
const cors = require('cors');

app.use(cors());

app.get('/api/results', (req, res) => {
  let jsonData = []
  try {
    const data = fs.readFileSync('./results.json', 'utf8');
    jsonData = JSON.parse(data);
    const { start, end } = req.query;
    const startTime = new Date(start);
    const endTime = new Date(end);
    const filteredResults = jsonData.filter(dataItem => {
      const resultTime = new Date(dataItem.STARTED_AT);
      return resultTime >= startTime && resultTime <= endTime;
    });
    return res.json(filteredResults)
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
