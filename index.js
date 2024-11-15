const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.get('/about', (req, res) => {
    res.send('This is the About page!');
  });
  
  app.get('/contact', (req, res) => {
    res.send('Contact us at contact@example.com');
  });

  app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello, this is JSON data!', status: 'success' });
  });
  

  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
