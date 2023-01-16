const { Université } = require("../model/Université");
async function adduniversité(req, res, next) {
  Université.findOne({ email_université: req.body.email_université })
    .then((université) => {
      if (université) {
        res
          .status(409)
          .json({ status: 409, message: "Université already created" });
      } else {
        const { stagiaires } = req.body;
        let universitéDetails = new Université({
          nom_université: req.body.nom_université,
          adresse_université: req.body.adresse_université,
          email_université: req.body.email_université,
          tel_université: req.body.tel_université,
          stagiaires: stagiaires,
        });
        universitéDetails
          .save()
          .then(() => {
            res.status(201).json({
              status: 201,
              message: "université created with success",
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

function finduniversité(req, res, next) {
  université = Université.findById(req.params.universiteId)
    .then((université) => {
      if (université) {
        {
          res.status(201).json({ status: 201, Data: université });
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
async function deleteuniversité(req, res, next) {
  try {
    if (req.query.universitéId) {
      const université = await Université.findOneAndDelete({
        _id: req.query.universitéId,
      });
      if (université) {
        return res
          .status(200)
          .json({ status: 200, message: "université deleted" });
      }
      return res.status(404).json({ status: 404, message: "wrong Stagiaire" });
    }
    return res
      .status(400)
      .json({ status: 400, message: "université not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
async function updateuniversté(req, res, next) {
  let nom_université = req.body.nom_université;
  let adresse_université = req.body.adresse_université;
  let email_université = req.body.email_université;
  let tel_université = req.body.tel_université;
  const { stagiaires } = req.body;
  try {
    const université = await Université.findOne({
      _id: req.params.universiteId,
    });
    if (!université)
      return res
        .status(404)
        .json({ status: 404, message: "université not exisit " });
    else {
      const updateduniversité = {
        nom_université: nom_université,
        adresse_université: adresse_université,
        email_université: email_université,
        tel_université: tel_université,
        stagiaires: stagiaires,
      };
      const newUpdateduniversité = await Université.findByIdAndUpdate(
        req.params.universiteId,
        updateduniversité
      );
      const newUpdateduniversité1 = await Université.findById(
        newUpdateduniversité._id
      );
      res.status(200).json({ status: 200, data: newUpdateduniversité1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
}

const getAlluniversité = async (req, res, next) => {
  Université.find()
    .then((universités) => {
      res.status(200).json({ status: 200, listUniversités: universités });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, message: err.message });
    });
};
exports.adduniversité = adduniversité;
exports.deleteuniversité = deleteuniversité;
exports.finduniversité = finduniversité;
exports.updateduniversité = updateuniversté;
exports.getAlluniversité = getAlluniversité;
