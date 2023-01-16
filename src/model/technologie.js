const mongoose = require("mongoose");
const technologieSchema = mongoose.Schema({
  nom_technologie: {
    type: String,
    required: true,
  },
  sujetStages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "sujetStage",
    },
  ],
});
module.exports.Technologie = mongoose.model("technologie", technologieSchema);
