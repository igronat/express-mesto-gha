const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
    Card.find({})
      .then(card => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

};

module.exports.createCard = (req, res) => {
  const { name, link} = req.body;
  Card.create({
    name: name,
    link: link,
    owner: req.user._id,
   })
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

};