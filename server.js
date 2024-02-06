const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

app.use(express.static('public'));

app.get('/bookings', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'fakeBookings.json');

  // Read the file asynchronously
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    try {
      // Parse the JSON data
      const bookings = JSON.parse(data);
      res.json(bookings);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
