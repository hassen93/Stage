const mongoose = require("mongoose");
const universitéSchema = mongoose.Schema({
  nom_université: {
    type: String,
    required: true,
  },

  adresse_université: {
    type: String,
    required: true,
  },
  email_université: {
    type: String,
    required: true,
  },
  tel_université: {
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
module.exports.Université = mongoose.model("université", universitéSchema);
