var express = require("express");
var router = express.Router();
const Comment = require("../models/comment");

// get comments listing
router.get("/", (req, res, next) => {
  Comment.find().then((comments) => {
    res.status(200).json(comments);
  });
});

// all comments for single user
router.get("/allcomments/:userId", (req, res, next) => {
  Comment.find({ userId: req.params.userId })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get Top10 Hashtags
router.get("/top10Hashtags", (req, res, next) => {
  Comment.aggregate([
    { $unwind: "$hashTags" },
    { $group: { _id: "$hashTags", tf: { $sum: 1 } } },
    { $sort: { tf: -1 } },
    { $limit: 10 },
  ])
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Top10 Mentions
router.get("/top10Mentions", (req, res, next) => {
  Comment.aggregate([
    { $unwind: "$mentions" },
    { $group: { _id: "$mentions", tf: { $sum: 1 } } },
    { $sort: { tf: -1 } },
    { $limit: 10 },
  ])
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get single comment
router.get("/:id", (req, res, next) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      res.json(err);
    });
});

// create new comment
router.post("/", (req, res, next) => {
  const { id, hashTags, mentions, text, timestamp, userId } = req.body;

  Comment.create({
    id,
    hashTags,
    mentions,
    text,
    timestamp,
    userId,
  })
    .then(() => {
      res.status(200).send("Comment created sucessfull");
    })
    .catch((err) => {
      res.json(err);
    });
});

// edit user
router.put("/:id", (req, res, next) => {
  const { id, hashTags, mentions, text, timestamp, userId } = req.body;
  Comment.findOneAndUpdate(
    { id: req.params.id },
    {
      $set: {
        id,
        hashTags,
        mentions,
        text,
        timestamp,
        userId,
      },
    }
  )
    .then((response) => {
      res.send("Comment updated sucessfully");
    })
    .catch((err) => {
      res.json(err);
    });
});

// delete user
router.delete("/:id", (req, res, next) => {
  Comment.findOneAndDelete({ id: req.params.id })
    .then(() => {
      res.send("user deleted sucessfully");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
