require("dotenv").config();
const express = require("express");
const bodyParser = require("express").json;
const cors = require("cors"); 
const { sequelize } = require("./src/models");
const routes = require("./src/routes");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); 
app.use(bodyParser());
app.use("/api", routes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com DB OK");

    await sequelize.sync({ alter: true });
    console.log("Todos os modelos de objetos sincronizados");

    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error("Erro ao conectar com o DB:", err);
    process.exit(1);
  }
})();
