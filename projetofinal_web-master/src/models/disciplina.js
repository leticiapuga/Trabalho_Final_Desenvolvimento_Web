module.exports = (sequelize, DataTypes) => {
  const Disciplina = sequelize.define(
    "disciplina",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING, allowNull: false },
      cursoId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "disciplinas",
      timestamps: true,
    }
  );

  Disciplina.associate = (models) => {
    Disciplina.hasMany(models.Turma, {
      as: "turmas",
      foreignKey: "disciplinaId",
    });
  };

  return Disciplina;
};
