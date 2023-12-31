import { Router } from 'express';
import { Card } from '../models/card';
import { Deck } from '../models/deck';
import { UserDeck } from '../models/userdeck';
import { UserCard } from '../models/usercards';
import { Op } from 'sequelize';

const router = Router();

// Card routes
router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.findAll({include: UserCard});
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/cards/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cards = await Card.findAll({ include:UserCard, where: { id: id} });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/cards', async (req, res) => {
  try {
    const newCard = await Card.create(req.body);
    res.status(200).json(newCard);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/cards/:id',async (req, res) => {
  try {
    const id = req.params.id;
    await Card.update(req.body, { where: {id: id}});
    res.status(200).send({
      'message': 'Card updated successfully',
    });
  } catch (error) {
    res.status(400).send(error);
  }
})

// Deck routes
router.get('/decks', async (req, res) => {
  try {
    const decks = await Deck.findAll({ include: [{model: Card}, {model: UserDeck}] });
    res.status(200).json(decks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/decks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deck = await Deck.findAll({ include: [{model: Card}, {model: UserDeck}], where: { id: id} });
    res.status(200).json(deck);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/decks', async (req, res) => {
  try {
    const newDeck = await Deck.create(req.body);
    res.status(201).json(newDeck);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/decks/:id',async (req, res) => {
  try {
    const id = req.params.id;
    await Deck.update(req.body, { where: {id: id}});
    res.status(200).send({
      'message': 'Deck updated successfully',
    });
  } catch (error) {
    res.status(400).send(error);
  }
})

// UserDeck routes
router.get('/userdecks', async (req, res) => {
  try {
    const userdecks = await UserDeck.findAll({ include: [{
      model: Deck,
  }] });
    res.status(200).json(userdecks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/userdecks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userdeck = await UserDeck.findAll({ include: [{
      model: Deck,
  }], where: {id: id}});
    res.status(200).json(userdeck);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/userdecks', async (req, res) => {
  try {
    const newUserDeck = await UserDeck.create(req.body);
    res.status(200).json(newUserDeck);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/userdecks/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await UserDeck.update(req.body,{ where: {id: id}})
    res.status(200).send({
      'message': 'Userdeck Updated successfully.'
    })
  } catch (error) {
    res.status(400).send(error);
  }
});

//UserCard routes
router.get('/usercards', async (req, res) => {
  try {
    const usercards = await UserCard.findAll({ include: [{
      model: Card
}], });
    res.status(200).json(usercards);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/usercards/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usercard = await UserCard.findAll({ include: [{
      model: Card,
  }], where: { id: id} });
    res.status(200).json(usercard);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/usercards', async (req, res) => {
  try {
    const newUserCard = await Deck.create(req.body);
    res.status(200).json(newUserCard);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/usercards/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await UserCard.update(req.body,{ where: {id: id}})
    res.status(200).send({
      'message': 'Usercard Updated successfully'
    })
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/usercards/never-reviewed', async (req, res) => {
  try {
    const cardsNeverReviewed = await UserCard.findAll({
      include: [{ model: Card }]
    });
    const filteredCards = cardsNeverReviewed.filter(card => card.numberOfTimesReviewed === 0);
    res.status(200).json(filteredCards);
  } catch (error: any) {
    console.log(error.message);
    console.log(error.original);
    res.status(500).send(error);
  }
});

router.get('/usercards/reviewed-today', async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  try {
    const cardsReviewedToday = await UserCard.findAll({
      include: [{ model: Card }]
    });
    const filteredCards = cardsReviewedToday.filter(card => new Date(card.lastReviewedDate) === startOfDay);
    res.status(200).json(filteredCards);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
