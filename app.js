const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '6255667299d9e2828941375f' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));
app.use((req, res) => {
  res.status(404).send({ message: "Данный ресурс не найден" });
      })


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})