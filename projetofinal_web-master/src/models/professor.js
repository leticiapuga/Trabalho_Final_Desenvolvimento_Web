module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define(
    "professor",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: DataTypes.STRING,
      siape: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      tableName: "professor",
      timestamps: true,
    }
  );

  Professor.associate = (models) => {
    Professor.hasMany(models.Turma, {
      as: "turmas",
      foreignKey: "professorId",
    });
  };

  return Professor;
};
