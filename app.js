const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
// const router = require('express').Router();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//   res.send('Hello')
// })

// app.post('/',(req, res) => {
//   res.send(req.body)
// })

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', require('./routes/users'));



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})