const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory data store for demonstration (replace this with a database in a real scenario)
let items = [];

// Route to get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Route to add a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).send('Item added successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Route to clear all items
app.delete('/api/items', (req, res) => {
    items = []; // Clear the items array
    res.send('Items cleared successfully');
  });