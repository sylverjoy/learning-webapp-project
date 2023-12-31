import { Card, associateCard } from "../models/card";
import { Deck, associateDeck } from "../models/deck";
import { UserCard } from "../models/usercards";
import { UserDeck } from "../models/userdeck";
import { sequelize } from "./database";

export async function initializeDatabase() {
    // Sync the models with the database
    await Deck.sync({ force: true });
    await Card.sync({ force: true });
    await UserDeck.sync({ force: true });
    await UserCard.sync({ force: true });

    Deck.associate({ Card });
    Card.associate({ Deck });
    UserDeck.associate({Deck});
    UserCard.associate({Card});
    
    associateDeck({ UserDeck });
    associateCard({ UserCard });

    await sequelize.sync({alter: true});

    // Create two decks
    const deck1 = await Deck.create({
      name: 'English Grammar',
      description: 'Test your English grammar',
      category: 'Language',
      targetAudience: 'Intended to everyone that wants to learn English.',
      difficultyLevel: 'Medium',
    });
  
    const deck2 = await Deck.create({
        name: 'Arithmetics',
        description: 'Test your Arithmetics',
        category: 'Maths',
        targetAudience: 'Intended to everyone that wants to learn Arithmetic.',
        difficultyLevel: 'Medium',
    });
  
    // Create 10 cards deck 1
    await Card.create({
        recto: `Identify the part of speech for the word in capital letters: The cat is SLEEPING on the windowsill.`,
        verso: `VERB`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Choose the correct form of the verb to complete the sentence: She _______ to the store yesterday.
        a) go
        b) goes
        c) went `,
        verso: `c) went`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Correct the sentence: "Fewer people attend the meeting than last year."`,
        verso: `Less people attend the meeting than last year.`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Identify the type of sentence: "Although it was raining, we decided to go for a walk."
        a) Simple
        b) Compound
        c) Complex
        d) Compound-complex`,
        verso: `c) Complex`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Use the correct pronoun in the sentence: "Sarah and _____ went to the store."
        a) her
        b) she
        c) they
        d) them`,
        verso: `a) her`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Identify the dangling modifier in the sentence: "Having finished the assignment, the computer crashed."`,
        verso: `Having finished the assignment`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Choose the correct sentence with proper parallel structure:
        a) He likes hiking, swimming, and to ride his bike.
        b) He likes hiking, swimming, and riding his bike.
        c) He likes to hike, swim, and riding his bike.`,
        verso: `b) He likes hiking, swimming, and riding his bike.`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Correct the sentence: "Between you and I, the decision was not well-thought-out."`,
        verso: `Between you and me, the decision was not well-thought-out.`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Identify the voice of the verb in the sentence: "The cake was baked by Mary."`,
        verso: ` b) Passive`,
        DeckId: deck1.id,
     });
     await Card.create({
        recto: `Choose the sentence with the correct use of the subjunctive mood:
        a) If I was you, I would go.
        b) If I were you, I would go.
        c) If I am you, I will go.`,
        verso: `b) If I were you, I would go.`,
        DeckId: deck1.id,
     });
   
    
    // Create a UserDeck with one deck
   const startDate = new Date();
   const expectedEndDate = new Date(startDate);
   expectedEndDate.setMonth(startDate.getMonth() + 1);
   const userdeck = await UserDeck.create({
      startDate: startDate,
      expectedEndDate: expectedEndDate,
      minutesPerDayObjective: 30,
      DeckId: deck1.id, 
    });

  
    // Create UserCard entries for all cards from the selected deck
    for (const card of await Card.findAll({where: {DeckId: userdeck.dataValues.DeckId}})) {
      const userCard = await UserCard.create({
          CardId: card.id,
      });
   }

   console.log('Database initialization completed.');
  }