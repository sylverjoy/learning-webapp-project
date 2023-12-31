# Learning Web App

Learning Web App is a web application that allows users to create, review, and browse decks of flashcards for enhanced learning and memorization.

## Features

- Create flashcard decks.
- Insert flashcards in a deck.
- Review flashcards with a spaced repetition system.
- Browse flashcards based on their review status.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The only prerequisite is Docker. Make sure you have Docker installed on your machine:

- [Docker](https://www.docker.com/get-started)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sylverjoy/learning-webapp-project
cd learning-webapp-project
```
2. Use Docker Compose to build and run the containers:

```bash
docker-compose up --build
```


### Details of the web app

This is the first page you will see :
![image](https://github.com/sylverjoy/learning-webapp-project/assets/113913066/43d2f863-8710-4c50-9a3c-9ab7f54788e3)

#### Decks :

This menu allows the user to see all available flashcard decks. 
All the available decks are displayed with their name, category and brief description.

![image](https://github.com/sylverjoy/learning-webapp-project/assets/113913066/f25c7d4e-84ae-49c0-a91b-dad0c562cf6c)

Just below the existing decks, you can add a new deck.
![image](https://github.com/sylverjoy/learning-webapp-project/assets/113913066/cb0f4c73-f508-41d4-91d2-c49acc4744b5)


Once you choosed a deck to study, the recto of the first card appears. You can click on the 'Answer' button ton show the answer. After that, you have to choose your confidence level : 'Again', 'Hard', 'Good', or 'Easy' and then you pass to the next card.

![image](https://github.com/sylverjoy/learning-webapp-project/assets/149414061/7a0c84ba-f451-44ab-aed9-84169cc01d4b)

Cards will reappear for review based on the selected confidence level, ensuring efficient learning.

#### 'Add a flashcard' menu :

This interface allows you to add a flashcard (recto and verso) to a deck (already created) as follows :

![image](https://github.com/sylverjoy/learning-webapp-project/assets/149414061/70805376-96e2-47da-a712-8bf8ffd8b756)

#### 'Browse' menu:

The 'Browse' menu lists all the existing cards and decks. If you add a deck or a flashcard in a deck, it will update too. 

![image](https://github.com/sylverjoy/learning-webapp-project/assets/113913066/2182d199-6ebc-41cf-82b7-ea8e4efc6e3f)



#### 'Stats' menu :

In this tab you can see some graphs about your current progression. This tab is not finished.

![image](https://github.com/sylverjoy/learning-webapp-project/assets/113913066/725c5722-13a9-478e-8440-94d5f7ab0522)


## Built With
- Angular - The web framework used
- Express - The backend framework
- Sequelize - ORM for database interaction



