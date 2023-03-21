const { Stagiaire } = require("../model/stagiaire");
async function addStagiaire(req, res, next) {
  Stagiaire.findOne({ email_stagiaire: req.body.email_stagiaire })
    .then((stagiaire) => {
      if (stagiaire) {
        res
          .status(409)
          .json({ status: 409, message: "Stagiaire already created" });
      } else {
        const { encadreurs } = req.body;
        const { sujetStages } = req.body;
        const { universites } = req.body;
        let stagiaireDetails = new Stagiaire({
          nom_stagiaire: req.body.nom_stagiaire,
          prenom_stagiaire: req.body.prenom_stagiaire,
          email_stagiaire: req.body.email_stagiaire,
          Adresse_Stagiaire: req.body.Adresse_Stagiaire,
          Tel_stagiaire: req.body.Tel_stagiaire,
          Date_naissance: req.body.Date_naissance,
          Niveau_universitaire: req.body.Niveau_universitaire,
          Spécialité: req.body.Spécialité,
          Date_début: req.body.Date_début,
          Date_fin: req.body.Date_fin,
          Note: req.body.Note,
          Mention: req.body.Mention,
          universites: universites,
          sujetStages: sujetStages,
          encadreurs: encadreurs,
        });
        if (req.files) {
          let path = "";
          req.files.forEach(function (files, index, arr) {
            path = path + files.path + ",";
          });
          path = path.substring(0, path.lastIndexOf(","));

          stagiaireDetails.image = path;
        }
        stagiaireDetails
          .save()
          .then(() => {
            res
              .status(201)
              .json({ status: 201, message: "stagiaire created with success" });
          })
          .catch((error) => {
            res.status(400).json({ status: 400, message: error.message });
          });
      }
    })

    .catch((error) => {
      res.status(400).json({ status: 400, message: error.message });
    });
}

function findStagiaire(req, res, next) {
  stagiaire = Stagiaire.findById(req.params.stagiaireId)
    .then((stagiaire) => {
      if (stagiaire) {
        {
          res.status(201).json({ status: 201, Data: stagiaire });
        }
      } else {
        {
          res.status(404).json({ status: 404, message: "not find" });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, message: error.message });
    });
}
function findstagiaireByNom(req, res, next) {
  stagiaire = Stagiaire.findOne({
    nom_stagiaire: req.params.nom_stagiaire,
  })
    .then((stagiaire) => {
      if (stagiaire) {
        {
          res.status(201).json({ status: 201, Data: stagiaire });
        }
      } else {
        {
          res.status(404).json({ status: 404, message: "not find" });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, message: error.message });
    });
}
async function deleteStagiaire(req, res, next) {
  try {
    if (req.params.stagiaireId) {
      const stagiaire = await Stagiaire.findOneAndDelete({
        _id: req.params.stagiaireId,
      });
      if (stagiaire) {
        return res
          .status(200)
          .json({ status: 200, message: "Stagiaire deleted" });
      }
      return res.status(404).json({ status: 404, message: "wrong Stagiaire" });
    }
    return res
      .status(400)
      .json({ status: 400, message: "Stagiaire not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
const getAllstagiaire = async (req, res, next) => {
  Stagiaire.find()
    .populate("universites")
    .populate("sujetStages")
    .populate("encadreurs")

    .then((stagiaires) => {
      res.status(200).json({ status: 200, listStagiaires: stagiaires });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, message: err.message });
    });
};
async function updateStagiaire(req, res, next) {
  let userId = req.body.userId;
  let nom_stagiaire = req.body.nom_stagiaire;
  let prenom_stagiaire = req.body.prenom_stagiaire;
  let email_stagiaire = req.body.email_stagiaire;
  let Adresse_Stagiaire = req.body.Adresse_Stagiaire;
  let Tel_stagiaire = req.body.Tel_stagiaire;
  let Date_naissance = req.body.Date_naissance;
  let Niveau_universitaire = req.body.Niveau_universitaire;
  let Spécialité = req.body.Spécialité;
  let Date_début = req.body.Date_début;
  let Date_fin = req.body.Date_fin;
  let Note = req.body.Note;
  let Mention = req.body.Mention;
  const { sujetStages } = req.body;
  const { encadreurs } = req.body;
  const { universites } = req.body;
  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));

    images = path;
  }
  try {
    const stagiaire = await Stagiaire.findOne({ _id: req.params.stagiaireId });
    if (!stagiaire)
      return res
        .status(404)
        .json({ status: 404, message: "stagiaire not exisit " });
    else {
      const updatedStagiaire = {
        userId: userId,
        image: images,
        nom_stagiaire: nom_stagiaire,
        prenom_stagiaire: prenom_stagiaire,
        email_stagiaire: email_stagiaire,
        Adresse_Stagiaire: Adresse_Stagiaire,
        Tel_stagiaire: Tel_stagiaire,
        Date_naissance: Date_naissance,
        Niveau_universitaire: Niveau_universitaire,
        Spécialité: Spécialité,
        Date_début: Date_début,
        Date_fin: Date_fin,
        Note: Note,
        Mention: Mention,
        universites: universites,
        sujetStages: sujetStages,
        encadreurs: encadreurs,
      };
      const newUpdatedStagiaire = await Stagiaire.findByIdAndUpdate(
        req.params.stagiaireId,
        updatedStagiaire
      );
      const newUpdatedStagiaire1 = await Stagiaire.findById(
        newUpdatedStagiaire._id
      );
      res.status(200).json({ status: 200, data: newUpdatedStagiaire1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}

async function updateUniversiteOfStagiaire(req, res, next) {
  const { universites } = req.body;
  try {
    const stagiaire = await Stagiaire.findOne({ _id: req.params.stagiaireId });
    if (!stagiaire)
      return res
        .status(404)
        .json({ status: 404, message: "stagiaire not exisit " });
    else {
      const updatedStagiaire = {
        nom_stagiaire: stagiaire.nom_stagiaire,
        prenom_stagiaire: stagiaire.prenom_stagiaire,
        email_stagiaire: stagiaire.email_stagiaire,
        Adresse_Stagiaire: stagiaire.Adresse_Stagiaire,
        Tel_stagiaire: stagiaire.Tel_stagiaire,
        Date_naissance: stagiaire.Date_naissance,
        Niveau_universitaire: stagiaire.Niveau_universitaire,
        Spécialité: stagiaire.Spécialité,
        Date_début: stagiaire.Date_début,
        Date_fin: stagiaire.Date_fin,
        Note: stagiaire.Note,
        Mention: stagiaire.Mention,
        universites: universites,
        sujetStages: stagiaire.sujetStages,
        encadreurs: stagiaire.encadreurs,
      };
      const newUpdatedStagiaire = await Stagiaire.findByIdAndUpdate(
        req.params.stagiaireId,
        updatedStagiaire
      );
      const newUpdatedStagiaire1 = await Stagiaire.findById(
        newUpdatedStagiaire._id
      );
      res.status(200).json({ status: 200, data: newUpdatedStagiaire1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}
async function updateSujetStagesOfStagiaire(req, res, next) {
  const { sujetStages } = req.body;
  try {
    const stagiaire = await Stagiaire.findOne({ _id: req.params.stagiaireId });
    if (!stagiaire)
      return res
        .status(404)
        .json({ status: 404, message: "stagiaire not exisit " });
    else {
      const updatedStagiaire = {
        nom_stagiaire: stagiaire.nom_stagiaire,
        prenom_stagiaire: stagiaire.prenom_stagiaire,
        email_stagiaire: stagiaire.email_stagiaire,
        Adresse_Stagiaire: stagiaire.Adresse_Stagiaire,
        Tel_stagiaire: stagiaire.Tel_stagiaire,
        Date_naissance: stagiaire.Date_naissance,
        Niveau_universitaire: stagiaire.Niveau_universitaire,
        Spécialité: stagiaire.Spécialité,
        Date_début: stagiaire.Date_début,
        Date_fin: stagiaire.Date_fin,
        Note: stagiaire.Note,
        Mention: stagiaire.Mention,
        universites: stagiaire.universites,
        sujetStages: sujetStages,
        encadreurs: stagiaire.encadreurs,
      };
      const newUpdatedStagiaire = await Stagiaire.findByIdAndUpdate(
        req.params.stagiaireId,
        updatedStagiaire
      );
      const newUpdatedStagiaire1 = await Stagiaire.findById(
        newUpdatedStagiaire._id
      );
      res.status(200).json({ status: 200, data: newUpdatedStagiaire1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}
async function updateEncadreurOfStagiaire(req, res, next) {
  const { encadreurs } = req.body;
  try {
    const stagiaire = await Stagiaire.findOne({ _id: req.params.stagiaireId });
    if (!stagiaire)
      return res
        .status(404)
        .json({ status: 404, message: "stagiaire not exisit " });
    else {
      const updatedStagiaire = {
        nom_stagiaire: stagiaire.nom_stagiaire,
        prenom_stagiaire: stagiaire.prenom_stagiaire,
        email_stagiaire: stagiaire.email_stagiaire,
        Adresse_Stagiaire: stagiaire.Adresse_Stagiaire,
        Tel_stagiaire: stagiaire.Tel_stagiaire,
        Date_naissance: stagiaire.Date_naissance,
        Niveau_universitaire: stagiaire.Niveau_universitaire,
        Spécialité: stagiaire.Spécialité,
        Date_début: stagiaire.Date_début,
        Date_fin: stagiaire.Date_fin,
        Note: stagiaire.Note,
        Mention: stagiaire.Mention,
        universites: stagiaire.universites,
        sujetStages: stagiaire.sujetStages,
        encadreurs: encadreurs,
      };
      const newUpdatedStagiaire = await Stagiaire.findByIdAndUpdate(
        req.params.stagiaireId,
        updatedStagiaire
      );
      const newUpdatedStagiaire1 = await Stagiaire.findById(
        newUpdatedStagiaire._id
      );
      res.status(200).json({ status: 200, data: newUpdatedStagiaire1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}

exports.addStagiaire = addStagiaire;
exports.deleteStagiaire = deleteStagiaire;
exports.findStagiaire = findStagiaire;
exports.updateStagiaire = updateStagiaire;
exports.getAllstagiaire = getAllstagiaire;
exports.findstagiaireByNom = findstagiaireByNom;
exports.updateEncadreurOfStagiaire = updateEncadreurOfStagiaire;
exports.updateSujetStagesOfStagiaire = updateSujetStagesOfStagiaire;
exports.updateUniversiteOfStagiaire = updateUniversiteOfStagiaire;
