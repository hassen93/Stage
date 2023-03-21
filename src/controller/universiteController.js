const { Universite } = require("../model/Universite");
async function adduniversite(req, res, next) {
  Universite.findOne({ email_universite: req.body.email_universite })
    .then((universite) => {
      if (universite) {
        res
          .status(409)
          .json({ status: 409, message: "Universite already created" });
      } else {
        const { stagiaires } = req.body;
        let universiteDetails = new Universite({
          nom_universite: req.body.nom_universite,
          adresse_universite: req.body.adresse_universite,
          email_universite: req.body.email_universite,
          tel_universite: req.body.tel_universite,
          stagiaires: stagiaires,
        });
        if (req.files) {
          let path = "";
          req.files.forEach(function (files, index, arr) {
            path = path + files.path + ",";
          });
          path = path.substring(0, path.lastIndexOf(","));

          universiteDetails.image = path;
        }
        universiteDetails
          .save()
          .then(() => {
            res.status(201).json({
              status: 201,
              message: "universite created with success",
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

function finduniversite(req, res, next) {
  universite = Universite.findById(req.params.universiteId)
    .then((universite) => {
      if (universite) {
        {
          res.status(201).json({ status: 201, Data: universite });
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

function finduniversiteByNom(req, res, next) {
  universite = Universite.findOne({
    nom_universite: req.params.nom_universite,
  })
    .then((universite) => {
      if (universite) {
        {
          res.status(201).json({ status: 201, Data: universite });
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
async function deleteuniversite(req, res, next) {
  try {
    if (req.params.universiteId) {
      const universite = await Universite.findOneAndDelete({
        _id: req.params.universiteId,
      });
      if (universite) {
        return res
          .status(200)
          .json({ status: 200, message: "universite deleted" });
      }
      return res.status(404).json({ status: 404, message: "wrong Stagiaire" });
    }
    return res
      .status(400)
      .json({ status: 400, message: "universite not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
async function updateuniversté(req, res, next) {
  let nom_universite = req.body.nom_universite;
  let adresse_universite = req.body.adresse_universite;
  let email_universite = req.body.email_universite;
  let tel_universite = req.body.tel_universite;
  const { stagiaires } = req.body;
  if (req.files) {
    let path = "";
    req.files.forEach(function (files, index, arr) {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));

    images = path;
  }
  try {
    const universite = await Universite.findOne({
      _id: req.params.universiteId,
    });
    if (!universite)
      return res
        .status(404)
        .json({ status: 404, message: "universite not exisit " });
    else {
      const updateduniversite = {
        image: images,
        nom_universite: nom_universite,
        adresse_universite: adresse_universite,
        email_universite: email_universite,
        tel_universite: tel_universite,
        stagiaires: stagiaires,
      };
      const newUpdateduniversite = await Universite.findByIdAndUpdate(
        req.params.universiteId,
        updateduniversite
      );
      const newUpdateduniversite1 = await Universite.findById(
        newUpdateduniversite._id
      );
      res.status(200).json({ status: 200, data: newUpdateduniversite1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}

const getAlluniversite = async (req, res, next) => {
  Universite.find()
    .populate("stagiaires")
    .then((universites) => {
      res.status(200).json({ status: 200, listUniversites: universites });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, message: err.message });
    });
};
exports.adduniversite = adduniversite;
exports.deleteuniversite = deleteuniversite;
exports.finduniversite = finduniversite;
exports.updateduniversite = updateuniversté;
exports.getAlluniversite = getAlluniversite;
exports.finduniversiteByNom = finduniversiteByNom;
