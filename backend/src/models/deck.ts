import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; 

class Deck extends Model {
  public id!: number;
  public name!: string;
  public description: string | undefined;
  public category: string | undefined;
  public targetAudience: string | undefined;
  public difficultyLevel!: string;

  static associate(models: any) {
    Deck.hasMany(models.Card);
  }
}


Deck.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  category: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  targetAudience: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  difficultyLevel: {
    type: new DataTypes.ENUM('Easy','Medium','Hard'),
    allowNull: false,
  }
}, {
  tableName: 'deck',
  sequelize: sequelize, 
});

export { Deck, associate as associateDeck };

function associate(models: any) {
  Deck.hasMany(models.UserDeck);
}