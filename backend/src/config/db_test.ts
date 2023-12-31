import { sequelize } from "./database";

export async function testDB() {
    try {
      await sequelize.authenticate();
      console.log('DB connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };