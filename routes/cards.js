const router = require('express').Router();

const {createCard, getCards, deleteCard, likeCard, dislikeCard} = require('../controllers/cards')

router.post('/cards', createCard);
router.get('/cards', getCards);
router.delete('/cards/:id', deleteCard);
router.patch('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;