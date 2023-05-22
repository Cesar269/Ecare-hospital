const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
// Recibir información de tipo JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ecare hospital');
});

routerApi(app);

app.listen(port, () => {
  console.log('Port: ' + port);
});
