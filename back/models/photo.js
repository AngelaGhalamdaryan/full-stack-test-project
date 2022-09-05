'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static getTableName() {
      return "Photo"
    }
    static associate(models) {
      // define association here
    }
  };
  Photo.init({
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};