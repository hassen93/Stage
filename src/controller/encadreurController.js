const { Encadreur } = require("../model/encadreur");
async function addencadreur(req, res, next) {
  Encadreur.findOne({ email_encadreur: req.body.email_encadreur })
    .then((encadreur) => {
      if (encadreur) {
        res
          .status(409)
          .json({ status: 409, message: "encadreur already created" });
      } else {
        const { stagiaires } = req.body;
        const { sujetStages } = req.body;
        let encadreurDetails = new Encadreur({
          nom_encadreur: req.body.nom_encadreur,
          prenom_encadreur: req.body.prenom_encadreur,
          email_encadreur: req.body.email_encadreur,
          Adresse_encadreur: req.body.Adresse_encadreur,
          Tel_encadreur: req.body.Tel_encadreur,
          fonction: req.body.fonction,
          stagiaires: stagiaires,
          sujetStages: sujetStages,
        });
        encadreurDetails
          .save()
          .then(() => {
            res
              .status(201)
              .json({ status: 201, message: "encadreur created with success" });
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

function findencadreur(req, res, next) {
  encadreur = Encadreur.findById(req.params.encadreurId)
    .then((encadreur) => {
      if (encadreur) {
        {
          res.status(201).json({ status: 201, Data: encadreur });
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
async function deleteencadreur(req, res, next) {
  try {
    if (req.query.encadreurId) {
      const encadreur = await Encadreur.findOneAndDelete({
        _id: req.query.encadreurId,
      });
      if (encadreur) {
        return res
          .status(200)
          .json({ status: 200, message: "Encadreur deleted" });
      }
      return res.status(404).json({ status: 404, message: "wrong Stagiaire" });
    }
    return res
      .status(400)
      .json({ status: 400, message: "Encadreur not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

async function updateencadreur(req, res, next) {
  let nom_encadreur = req.body.nom_encadreur;
  let prenom_encadreur = req.body.prenom_encadreur;
  let email_encadreur = req.body.email_encadreur;
  let Adresse_encadreur = req.body.Adresse_encadreur;
  let Tel_encadreur = req.body.Tel_encadreur;
  const { stagiaires } = req.body;
  const { sujetStages } = req.body;

  try {
    const encadreur = await Encadreur.findOne({ _id: req.params.encadreurId });
    if (!encadreur)
      return res
        .status(404)
        .json({ status: 404, message: "encadreur not exisit " });
    else {
      const updatedencadreur = {
        nom_encadreur: nom_encadreur,
        prenom_encadreur: prenom_encadreur,
        email_encadreur: email_encadreur,
        Adresse_encadreur: Adresse_encadreur,
        Tel_encadreur: Tel_encadreur,
        stagiaires: stagiaires,
        sujetStages: sujetStages,
      };
      const newUpdatedencadreur = await Encadreur.findByIdAndUpdate(
        req.params.encadreurId,
        updatedencadreur
      );
      const newUpdatedencadreur1 = await Encadreur.findById(
        newUpdatedencadreur._id
      );
      res.status(200).json({ status: 200, data: newUpdatedencadreur1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}

const getAllencadreur = async (req, res, next) => {
  Encadreur.find()
    .then((encadreurs) => {
      res.status(200).json({ status: 200, listEncadreurs: encadreurs });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, message: err.message });
    });
};
exports.addencadreur = addencadreur;
exports.deleteencadreur = deleteencadreur;
exports.findencadreur = findencadreur;
exports.updateencadreur = updateencadreur;
exports.getAllencadreur = getAllencadreur;
