const express = require("express");
require("dotenv").config(); // pour importer le port
const app = express();
var http = require("http");
var cors = require("cors");
var server = http.createServer(app);
const mongoose = require("mongoose");

const userRoutes = require("./src/routes/userRoutes");
const stagiaireRoutes = require("./src/routes/stagiaireRoutes");
const sujetStageRoutes = require("./src/routes/sujetStageRoutes");
const technologieRoutes = require("./src/routes/technologieRoutes");
const universitéRoutes = require("./src/routes/universitéRoutes");
const encadreurRoutes = require("./src/routes/encadreurRoutes");
const { normalizePort } = require("./src/common/common");
const res = require("express/lib/response");
var port = normalizePort(process.env.PORT || "2000");

app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion à MongoDB réussie !"))
  .catch((err) => {
    console.log("connexion à MongoDB échouée !", err.message);
  });

server.listen(port, () => {
  console.log("server is running on port ", port);
});

app.use("/", userRoutes);
app.use("/stagiaire", stagiaireRoutes);
app.use("/sujetStage", sujetStageRoutes);
app.use("/technologie", technologieRoutes);
app.use("/universite", universitéRoutes);

app.use("/encadreur", encadreurRoutes);
