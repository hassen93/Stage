const { SujetStage } = require("../model/sujetStage");
const { Stagiaire } = require("../model/stagiaire");
const { Technologie } = require("../model/technologie");
const technologieController = require("../controller/technologieController");
async function addsujetStage(req, res, next) {
  SujetStage.findOne({ nom_sujetStage: req.body.nom_sujetStage })
    .then((sujetStage) => {
      if (sujetStage) {
        res
          .status(409)
          .json({ status: 409, message: "sujetStage already created" });
      } else {
        const { technologies } = req.body;
        const { stagiaires } = req.body;
        const { encadreurs } = req.body;
        let sujetStageDetails = new SujetStage({
          nom_sujetStage: req.body.nom_sujetStage,
          stagiaires: stagiaires,
          technologies: technologies,
          encadreurs: encadreurs,
        });
        sujetStageDetails
          .save()
          .then(() => {
            res.status(201).json({
              status: 201,
              message: "sujetStage created with success",
            });
            console.log(sujetStageDetails._id);
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
function findsujetStage(req, res, next) {
  sujetStage = SujetStage.findById(req.params.sujetStageId)
    .then((sujetStage) => {
      if (sujetStage) {
        {
          res.status(201).json({ status: 201, Data: sujetStage });
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

function findsujetStageByNom(req, res, next) {
  sujetStage = SujetStage.findOne({
    nom_sujetStage: req.params.nom_sujetStage,
  })
    .then((sujetStage) => {
      if (sujetStage) {
        {
          res.status(201).json({ status: 201, Data: sujetStage });
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
async function updatesujetStage(req, res, next) {
  let nom_sujetStage = req.body.nom_sujetStage;
  const { stagiaires } = req.body;
  const { technologies } = req.body;
  const { encadreurs } = req.body;

  try {
    const sujetStage = await SujetStage.findOne({
      _id: req.params.sujetStageId,
    });
    if (!sujetStage)
      return res
        .status(404)
        .json({ status: 404, message: "sujetStage not exisit " });
    else {
      const updatedsujetStage = {
        nom_sujetStage: nom_sujetStage,
        stagiaires: stagiaires,
        technologies: technologies,
        encadreurs: encadreurs,
      };
      const newUpdatedsujetStage = await SujetStage.findByIdAndUpdate(
        req.params.sujetStageId,
        updatedsujetStage
      );
      const newUpdatedsujetStage1 = await SujetStage.findById(
        newUpdatedsujetStage._id
      );
      res.status(200).json({ status: 200, data: newUpdatedsujetStage1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}

async function deletesujetStage(req, res, next) {
  try {
    if (req.params.sujetStageId) {
      const sujetStage = await SujetStage.findOneAndDelete({
        _id: req.params.sujetStageId,
      });
      if (sujetStage) {
        return res
          .status(200)
          .json({ status: 200, message: "sujetStage deleted" });
      }
      return res.status(404).json({ status: 404, message: "wrong sujetStage" });
    }
    return res
      .status(400)
      .json({ status: 400, message: "sujetStage not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

const getAllsujetStage = async (req, res, next) => {
  SujetStage.find()
    .populate("stagiaires")
    .populate("technologies")
    .populate("encadreurs")
    .then((sujetStages) => {
      res.status(200).json({ status: 200, listSujetStages: sujetStages });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, message: err.message });
    });
};

async function updateTechnologiesOfSujetStage(req, res, next) {
  const { technologies } = req.body;
  try {
    const sujetStage = await SujetStage.findOne({
      _id: req.params.sujetStageId,
    });
    if (!sujetStage)
      return res
        .status(404)
        .json({ status: 404, message: "sujetStage not exisit " });
    else {
      const updatedsujetStage = {
        nom_sujetStage: sujetStage.nom_sujetStage,
        stagiaires: sujetStage.stagiaires,
        technologies: technologies,
        encadreurs: sujetStage.encadreurs,
      };
      console.log(technologies);
      const newUpdatedsujetStage = await SujetStage.findByIdAndUpdate(
        req.params.sujetStageId,
        updatedsujetStage
      );
      const newUpdatedsujetStage1 = await SujetStage.findById(
        newUpdatedsujetStage._id
      );
      res.status(200).json({ status: 200, data: newUpdatedsujetStage1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}

async function updateEncadreursOfSujetStage(req, res, next) {
  const { encadreurs } = req.body;
  try {
    const sujetStage = await SujetStage.findOne({
      _id: req.params.sujetStageId,
    });
    if (!sujetStage)
      return res
        .status(404)
        .json({ status: 404, message: "sujetStage not exisit " });
    else {
      const updatedsujetStage = {
        nom_sujetStage: sujetStage.nom_sujetStage,
        stagiaires: sujetStage.stagiaires,
        encadreurs: encadreurs,
        technologies: sujetStage.technologies,
      };
      const newUpdatedsujetStage = await SujetStage.findByIdAndUpdate(
        req.params.sujetStageId,
        updatedsujetStage
      );
      const newUpdatedsujetStage1 = await SujetStage.findById(
        newUpdatedsujetStage._id
      );
      res.status(200).json({ status: 200, data: newUpdatedsujetStage1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}
async function updateStagiairesOfSujetStage(req, res, next) {
  const { stagiaires } = req.body;
  try {
    const sujetStage = await SujetStage.findOne({
      _id: req.params.sujetStageId,
    });
    if (!sujetStage)
      return res
        .status(404)
        .json({ status: 404, message: "sujetStage not exisit " });
    else {
      const updatedsujetStage = {
        nom_sujetStage: sujetStage.nom_sujetStage,
        stagiaires: stagiaires,
        encadreurs: sujetStage.encadreurs,
        technologies: sujetStage.technologies,
      };
      const newUpdatedsujetStage = await SujetStage.findByIdAndUpdate(
        req.params.sujetStageId,
        updatedsujetStage
      );
      const newUpdatedsujetStage1 = await SujetStage.findById(
        newUpdatedsujetStage._id
      );
      res.status(200).json({ status: 200, data: newUpdatedsujetStage1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}
exports.addsujetStage = addsujetStage;
exports.findsujetStage = findsujetStage;
exports.updatesujetStage = updatesujetStage;
exports.deletesujetStage = deletesujetStage;
exports.getAllsujetStage = getAllsujetStage;
exports.findsujetStageByNom = findsujetStageByNom;
exports.updateTechnologiesOfSujetStage = updateTechnologiesOfSujetStage;
exports.updateEncadreursOfSujetStage = updateEncadreursOfSujetStage;
exports.updateStagiairesOfSujetStage = updateStagiairesOfSujetStage;
