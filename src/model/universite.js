const mongoose = require("mongoose");
const universiteSchema = mongoose.Schema({
  image: {
    type: String,
  },
  nom_universite: {
    type: String,
    required: true,
  },

  adresse_universite: {
    type: String,
    required: true,
  },
  email_universite: {
    type: String,
    required: true,
  },
  tel_universite: {
    type: Number,
    required: true,
  },
  stagiaires: [
    {
      type: mongoose.Types.ObjectId,
      ref: "stagiaire",
    },
  ],
});
module.exports.Universite = mongoose.model("universite", universiteSchema);
