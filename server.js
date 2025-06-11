// server.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
app.use(express.json());

const uri = 'mongodb://mongodb:27017';
let db;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    db = client.db('testdb');
    app.listen(port, () => console.log(`API running on port ${port}`));
  })
  .catch(err => console.error(err));

app.post('/data', async (req, res) => {
  const result = await db.collection('docs').insertOne(req.body);
  res.send(result);
});

app.get('/data', async (req, res) => {
  const docs = await db.collection('docs').find().toArray();
  res.send(docs);
});
