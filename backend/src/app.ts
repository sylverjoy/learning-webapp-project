import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import { initializeDatabase } from './config/db_init';
import { testDB } from './config/db_test';

const app = express();

app.use(express.json());

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));

testDB();

try {
  initializeDatabase();
} catch (error) {
  console.error('Unable to initialize DB: ', error);
}

// Utiliser le router pour toutes les routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
