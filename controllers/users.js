const User = require("../models/users");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user == null) {
        res.status(404).send({ message: "Пользователь не найден" });
      } 

      res.send({ data: user })})
    .catch((err) => {
      console.log(err.name)
      if (err.name === "CastError") {
        res.status(400).send({ message: "Пользователь не найден" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: "Пользователь не найден" });
        return;
      } else if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: "Пользователь не найден" });
        return;
      } else if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
