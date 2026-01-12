const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: async (usuario) => {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    }
  });

  Usuario.prototype.comparePassword = function (senha) {
    return bcrypt.compare(senha, this.senha);
  };

  return Usuario;
};