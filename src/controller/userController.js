const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function signUp(req, res) {
  User.findOne({ email: req.body.email }) // el User el zouz jebdou men nafs el instance
    .then((user) => {
      if (user) {
        res.status(409).json({ status: 409, message: "User already created" });
      } else {
        let RandomNumber = Math.floor(1000 + Math.random() * 9000);
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            let userDetails = new User({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              verification_code: RandomNumber,
              password: hash,
              role: req.body.role,
            });
            userDetails
              .save()
              .then(() => {
                res
                  .status(201)
                  .json({ status: 201, message: "user created with success" });
              })
              .catch((error) => {
                res.status(400).json({ status: 400, message: error.message });
              });
          })
          .catch((error) => {
            res.status(500).json({ status: 500, message: error.message });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: error.message });
    });
}

function findUser(req, res, next) {
  // console.log("7777777777777777777")
  user = User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        {
          res.status(201).json({ status: 201, Data: user });
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

function login(req, res) {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(404).json({ status: 404, message: "wrong Password" });
          } else {
            let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
              expiresIn: "1440h",
            });
            User.updateOne(
              { email: req.body.email },
              {
                $set: {
                  token: token,
                },
              }
            )
              .then(() => {
                res.status(200).json({
                  status: 200,
                  message: "Login with success",
                  data: user,
                });
              })
              .catch((err) => {
                res.status(400).json({ status: 400, message: err.message });
              });
          }
        })
        .catch((error) => {
          res.status(500).json({ status: 500, message: error.message });
        });
    } else {
      res.status(400).json({ status: 400, message: "User not found" });
    }
  });
}
async function deleteUser(req, res, next) {
  try {
    console.log("4444444");
    if (req.params.userId) {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (user) {
        return res
          .status(200)
          .json({ status: 200, message: "Login with user deleted" });
      }
      return res.status(404).json({ status: 404, message: "wrong Password" });
    }
    return res.status(400).json({ status: 400, message: "User not found" });
  } catch (err) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

const updateuser = async (req, res) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user)
      return res.status(404).json({ status: 404, message: "id not found " });
    else {
      const hash = await bcrypt.hash(password, 10);
      const upadtedUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hash,
      };
      const newUpdatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        upadtedUser
      );
      const newUpdatedUser1 = await User.findById(newUpdatedUser._id);
      res.status(200).json({ status: 200, data: newUpdatedUser1 });
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

const getAlluser = async (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({ status: 200, listUsers: users });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, message: err.message });
    });
};
function logout(req, res) {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: "You have been Logged Out" });
    } else {
      res.send({ msg: "Error" });
    }
  });
}
function findUserByEmail(req, res, next) {
  user = User.findOne({
    email: req.params.email,
  })
    .then((user) => {
      if (user) {
        {
          res.status(201).json({ status: 201, Data: user });
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
exports.signUp = signUp;
exports.findUser = findUser;
exports.login = login;
exports.deleteUser = deleteUser;
exports.updateuser = updateuser;
exports.getAlluser = getAlluser;
exports.logout = logout;
exports.findUserByEmail = findUserByEmail;
