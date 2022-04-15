const User = require('../models/users');
// const ValidationError = require('../errors.js');
// const ValidationError = (err) => {
//   err.name === 'ValidationError';
//   err.status === 400;
// }

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
 // const newUser =
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      console.log(err.name)
      // if (!(res === newUser)) {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' })
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    })

};

module.exports.getUsers = (req, res) => {
  const allUsers = User.find({})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      console.log(err)
      //if (!(allUsers === res)) {
        if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' })
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })});
};

module.exports.getUserId = (req, res) => {
  const user = User.findById(req.params.id)
    .then(user => res.send({data: user}))
    .catch((err) => {
      console.log(err.name)
      // if (!(res === user)) {
        if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' })
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about} = req.body;
  console.log(User[req.user._id])
  const updateUser = User.findByIdAndUpdate(req.user._id, {name, about},
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then(user => res.send({data: user}))
    .catch((err) => {
      // console.log(res.status)
      // if (err.status === 404) {
      //   res.send({ message: 'Пользователь не найден' })
      // }
      console.log(err.name)
      //if (!(res === updateUser)) {
        if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' })
        return;
      } else
     // if (!(req.body === updateUser)) {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' })
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })
    });
};

module.exports.updateAvatar = (req, res) => {
  // console.log(User[req.params.id])
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar},
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then(user => res.send({data: user}))
    .catch((err) =>{
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' })
        return;
      } else
     // if (!(req.body === updateUser)) {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' })
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' })
    });
};