const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.resolve(__dirname, './src')));
app.use(express.json());
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
