const User = require('../models/users');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch(() => {
      if (req.body) {
        res.status(400).send({ message: 'Переданы некорректные данные' })
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    })

};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => {
      if (!User) {
        res.status(400).send({ message: 'Переданы некорректные данные' })
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })});
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({data: user}))
    .catch(() => {
      if (req.params.id) {
        res.status(404).send({ message: 'Пользователь не найден' })
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })});
};

module.exports.updateUser = (req, res) => {
  const { name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about},
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then(user => res.send({data: user}))
    .catch(() => {
      if (!req.user._id) {
        res.status(404).send({ message: 'Пользователь не найден' })
        return;
      }
      if (req.body) {
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
    .catch(() =>{
      if (req.user._id) {
        res.status(404).send({ message: 'Пользователь не найден' })
        return;
      }
      if (req.body) {
        res.status(400).send({ message: 'Переданы некорректные данные' })
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' })});
};