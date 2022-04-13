const User = require('../models/users');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then(user => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Пользователи не найдены' }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({data: user}))
    .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about} = req.body;
  User.findByIdAndUpdate(req.params.id, {name, about},
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then(user => res.send({data: user}))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar} = req.body;
  User.findByIdAndUpdate(req.user.id, {avatar},
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .then(user => res.send({data: user}))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};