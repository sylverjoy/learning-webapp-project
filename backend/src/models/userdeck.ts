import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; 
import { Deck } from './deck';

class UserDeck extends Model {
  public id!: number;
  public startDate!: string;
  public expectedEndDate!: string;
  public minutesPerDayObjective!: string;

  static associate(models: any) {
    UserDeck.belongsTo(models.Deck);
}

}

UserDeck.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull:false,
    defaultValue: DataTypes.NOW,
  },
  expectedEndDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  minutesPerDayObjective: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  }
}, {
  tableName: 'userdeck',
  sequelize: sequelize, 
});

export { UserDeck };



