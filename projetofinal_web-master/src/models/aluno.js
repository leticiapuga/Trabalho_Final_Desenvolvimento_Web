module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('aluno', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    matricula: { type: DataTypes.STRING, allowNull: true, unique: true },
    dataNascimento: { type: DataTypes.DATEONLY, allowNull: true }
  }, {
    tableName: 'aluno',
    timestamps: true
  });

  return Aluno;
};