const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = './inventory.json';

// Load existing inventory
let inventory = [];
if (fs.existsSync(DATA_FILE)) {
  inventory = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Save inventory to file
function saveInventory() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(inventory, null, 2));
}

// Get all items
app.get('/api/items', (req, res) => {
  res.json(inventory);
});

// Add a new item
app.post('/api/items', (req, res) => {
  const { name, qty, price } = req.body;
  if (!name || !qty || !price) return res.status(400).send('Missing fields');
  const newItem = { name, qty, price };
  inventory.push(newItem);
  saveInventory();
  res.json(newItem);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
