const mongoose = require("mongoose");
const stagiaireSchema = mongoose.Schema({
  nom_stagiaire: {
    type: String,
    required: true,
  },
  prenom_stagiaire: {
    type: String,
    required: true,
  },
  email_stagiaire: {
    type: String,
    required: true,
  },
  Adresse_Stagiaire: {
    type: String,
    required: true,
  },
  Tel_stagiaire: {
    type: Number,
  },
  Date_naissance: {
    type: String,
    required: true,
  },
  Niveau_universitaire: {
    type: String,
    required: true,
  },
  Spécialité: {
    type: String,
    required: true,
  },
  Date_début: {
    type: String,
    required: true,
  },
  Date_fin: {
    type: String,
    required: true,
  },
  Note: {
    type: Number,
  },
  Mention: {
    type: String,
    required: true,
  },
  université: [
    {
      type: mongoose.Types.ObjectId,
      ref: "université",
    },
  ],
  sujetStages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "sujetStage",
    },
  ],
  encadreurs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "encadreur",
    },
  ],
});
module.exports.Stagiaire = mongoose.model("stagiaire", stagiaireSchema);
