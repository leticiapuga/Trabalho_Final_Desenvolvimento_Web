module.exports = (sequelize, DataTypes) => {
  return sequelize.define('matricula', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  });
};