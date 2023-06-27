const express = require('express');
const Datastore = require('nedb');

const app = express();
const db = new Datastore({ filename: 'data.db', autoload: true });

app.use(express.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const formData = req.body;
  db.insert(formData, (err, newDoc) => {
    if (err) {
      res.status(500).send('Error storing data');
    } else {
      res.send('Data stored successfully');
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});
