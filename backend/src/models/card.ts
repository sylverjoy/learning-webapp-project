import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { UserCard } from './usercards';

class Card extends Model {
  public id!: number; 
  public recto!: string;
  public verso!: string;

  static associate(models: any) {
    Card.belongsTo(models.Deck);
  }
}

Card.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  recto: {
    type: new DataTypes.STRING(500),
    allowNull: false,
  },
  verso: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  tableName: 'card',
  sequelize: sequelize, 
});

export { Card, associate as associateCard };

function associate(models: any) {
  Card.hasMany(models.UserCard);
}
