import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/database'; 

class UserCard extends Model {
  public id!: number;
  public confidenceLevel: string | undefined;
  public numberOfTimesReviewed!: number;
  public lastReviewedDate: string | undefined;
  public nextReviewDate: string | undefined;

  static associate(models: any) {
    UserCard.belongsTo(models.Card);
}

}

UserCard.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  lastReviewedDate: {
    type: DataTypes.DATE,
    allowNull:true,
  },
  nextReviewDate: {
    type: DataTypes.DATE,
    allowNull:true,
  },
  confidenceLevel: {
    type: DataTypes.ENUM('Again','Hard','Good','Easy'),
    allowNull: true,
    defaultValue: 'Again',
  },
  numberOfTimesReviewed: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  tableName: 'usercard',
  sequelize: sequelize, 
});


export { UserCard };



