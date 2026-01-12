module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define("curso", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: DataTypes.STRING,
  });

  Curso.associate = (models) => {
    Curso.hasMany(models.Turma, { as: "turmas", foreignKey: "cursoId" });
  };

  return Curso;
};
