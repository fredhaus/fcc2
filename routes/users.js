var express = require("express");
var router = express.Router();
const User = require("../models/user");

// get users listing
router.get("/", (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get user
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

// create new user
router.post("/", (req, res, next) => {
  const {
    contact: { firstName, lastName, email },
    id,
    profilePictureUrl,
    updatedAt,
    username,
  } = req.body;

  User.create({
    contact: { firstName, lastName, email },
    id,
    profilePictureUrl,
    updatedAt,
    username,
  })
    .then(() => {
      res.status(200).send("user created sucessfull");
    })
    .catch((err) => {
      res.json(err);
    });
});

// edit user
router.put("/:id", (req, res, next) => {
  const {
    contact: { firstName, lastName, email },
    id,
    profilePictureUrl,
    updatedAt,
    username,
  } = req.body;

  User.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        contact: { firstName, lastName, email },
        id,
        profilePictureUrl,
        updatedAt,
        username,
      },
    }
  )
    .then(() => {
      res.send("user updated sucessfully");
    })
    .catch((err) => {
      res.json(err);
    });
});

// delete user
router.delete("/:id", (req, res, next) => {
  User.findOneAndDelete({ id: req.params.id })
    .then(() => {
      res.send("user deleted sucessfully");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
