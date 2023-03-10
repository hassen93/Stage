const { SujetStage } = require("../model/sujetStage");
const { Technologie } = require("../model/technologie");
const sujetStageController = require("../controller/sujetStageController");
async function addtechnologie(req, res, next) {
  Technologie.findOne({ nom_technologie: req.body.nom_technologie })
    .then((technologie) => {
      if (technologie) {
        res
          .status(409)
          .json({ status: 409, message: "technologie already created" });
      } else {
        const { sujetStages } = req.body;
        let technologieDetails = new Technologie({
          nom_technologie: req.body.nom_technologie,
          sujetStages: sujetStages,
        });
        if (req.file) {
          technologieDetails.image = req.file.path;
        }
        technologieDetails
          .save()
          .then(() => {
            res.status(201).json({
              status: 201,
              message: "technologie created with success",
            });
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
function findtechnologieById(req, res, next) {
  technologie = Technologie.findById(req.params.technologieId)
    .then((technologie) => {
      if (technologie) {
        {
          res.status(201).json({ status: 201, Data: technologie });
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

function findtechnologieByNom(req, res, next) {
  technologie = Technologie.findOne({
    nom_technologie: req.params.nom_technologie,
  })
    .then((technologie) => {
      if (technologie) {
        {
          res.status(201).json({ status: 201, Data: technologie });
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

async function updatetechnologie(req, res, next) {
  let nom_technologie = req.body.nom_technologie;
  const { sujetStages } = req.body;

  try {
    const technologie = await Technologie.findOne({
      _id: req.params.technologieId,
    });
    if (!technologie)
      return res
        .status(404)
        .json({ status: 404, message: "technologie not exisit " });
    else {
      const updatedtechnologie = {
        nom_technologie: nom_technologie,
        sujetStages: sujetStages,
      };
      const newUpdatedtechnologie = await Technologie.findByIdAndUpdate(
        req.params.technologieId,
        updatedtechnologie
      );
      const newUpdatedtechnologie1 = await Technologie.findById(
        newUpdatedtechnologie._id
      );
      res.status(200).json({ status: 200, data: newUpdatedtechnologie1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}

async function deletetechnologie(req, res, next) {
  try {
    if (req.params.technologieId) {
      const technologie = await Technologie.findOneAndDelete({
        _id: req.params.technologieId,
      });
      if (technologie) {
        return res
          .status(200)
          .json({ status: 200, message: "technologie deleted" });
      }
      return res
        .status(404)
        .json({ status: 404, message: "wrong technologie" });
    }
    return res
      .status(400)
      .json({ status: 400, message: "technologie not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
const getAlltechnologie = async (req, res, next) => {
  Technologie.find()
    .populate("sujetStages")
    .then((technologies) => {
      res.status(200).json({ listTechnologies: technologies });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, message: err.message });
    });
};
exports.addtechnologie = addtechnologie;
exports.findtechnologieById = findtechnologieById;
exports.updatetechnologie = updatetechnologie;
exports.deletetechnologie = deletetechnologie;
exports.getAlltechnologie = getAlltechnologie;
exports.findtechnologieByNom = findtechnologieByNom;
