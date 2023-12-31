import { Sequelize } from 'sequelize';

// Paramètres de connexion à la base de données
const dbName = process.env.DB_NAME || 'mydb';
const dbUser = process.env.DB_USER || 'user';
const dbPass = process.env.DB_PASS || 'password';
const dbHost = process.env.DB_HOST || 'db';

// Création de l'instance Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: 5432,
  dialect: 'postgres', 
  logging: false,      
});

export { sequelize };
