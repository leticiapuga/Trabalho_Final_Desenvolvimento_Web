const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const db = {}; 

db.Usuario = require("./usuario")(sequelize, Sequelize.DataTypes);
db.Aluno = require("./aluno")(sequelize, Sequelize.DataTypes);
db.Professor = require("./professor")(sequelize, Sequelize.DataTypes);
db.Curso = require("./curso")(sequelize, Sequelize.DataTypes);
db.Disciplina = require("./disciplina")(sequelize, Sequelize.DataTypes);
db.Turma = require("./turma")(sequelize, Sequelize.DataTypes);
db.Matricula = require("./matricula")(sequelize, Sequelize.DataTypes);

db.Curso.hasMany(db.Disciplina);
db.Disciplina.belongsTo(db.Curso);
db.Aluno.belongsToMany(db.Turma, { through: db.Matricula });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
