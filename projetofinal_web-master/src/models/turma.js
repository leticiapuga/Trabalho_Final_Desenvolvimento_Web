module.exports = (sequelize, DataTypes) => {
  const Turma = sequelize.define("turma", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    semestre: DataTypes.STRING,
    cursoId: { type: DataTypes.INTEGER, allowNull: false },
    disciplinaId: { type: DataTypes.INTEGER, allowNull: false },
    professorId: { type: DataTypes.INTEGER, allowNull: false },
  });

  Turma.associate = (models) => {
    Turma.belongsTo(models.Curso, { as: "curso", foreignKey: "cursoId" });
    Turma.belongsTo(models.Disciplina, {
      as: "disciplina",
      foreignKey: "disciplinaId",
    });
    Turma.belongsTo(models.Professor, {
      as: "professor",
      foreignKey: "professorId",
    });
    Turma.belongsToMany(models.Aluno, {
      through: models.Matricula,
      as: "alunos",
      foreignKey: "turmaId",
      otherKey: "alunoId",
    });
  };

  return Turma;
};
