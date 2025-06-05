const express = require('express');
const { CosmosClient } = require("@azure/cosmos");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Cosmos DB config
const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const database = client.database('QuotesDB');
const container = database.container('Quotes');

app.get('/quote', async (req, res) => {
  const querySpec = {
    query: "SELECT * FROM Quotes OFFSET FLOOR(RAND() * 10) LIMIT 1"
  };
  const { resources: items } = await container.items.query(querySpec).fetchAll();
  res.json({ quote: items[0]?.text || "No quotes available" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
