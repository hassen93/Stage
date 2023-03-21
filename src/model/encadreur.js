const mongoose = require("mongoose");
const encadreurSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user1",
  },
  image: {
    type: String,
  },
  nom_encadreur: {
    type: String,
    required: true,
  },
  prenom_encadreur: {
    type: String,
    required: true,
  },
  email_encadreur: {
    type: String,
    required: true,
  },
  Adresse_encadreur: {
    type: String,
    required: true,
  },
  Tel_encadreur: {
    type: Number,
    required: true,
  },

  fonction: {
    type: String,
    required: true,
  },
  sujetStages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "sujetStage",
    },
  ],
  stagiaires: [
    {
      type: mongoose.Types.ObjectId,
      ref: "stagiaire",
    },
  ],
});
module.exports.Encadreur = mongoose.model("encadreur", encadreurSchema);
