const mongoose = require("mongoose");
const sujetStageSchema = mongoose.Schema({
  nom_sujetStage: {
    type: String,
    required: true,
  },
  stagiaires: [
    {
      type: mongoose.Types.ObjectId,
      ref: "stagiaire",
    },
  ],
  technologies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "technologie",
    },
  ],
  encadreurs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "encadreur",
    },
  ],
});
module.exports.SujetStage = mongoose.model("sujetStage", sujetStageSchema);
