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



// const cardSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 30,
//   },
//   link: {
//     type: String,
//     required: true,
//   },
//   owner: {
//     // type: ObjectId,
//     required: true,
//   },
//   likes: {
//     // type: ObjectId,
//     default: '',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   }
// });


// module.exports = mongoose.model('card', cardSchema);

// router.post('/users', (req, res) => {
//   const { name, about, avatar } = req.body;

//   User.create({ name, about, avatar })
//     // вернём записанные в базу данные
//     .then(user => res.send({ data: user }))
//     // данные не записались, вернём ошибку
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// });


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})