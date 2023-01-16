const mongoose = require("mongoose");
const encadreurSchema = mongoose.Schema({
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
