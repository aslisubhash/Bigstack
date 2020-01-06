const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


//Load person model
const Person = require("../../models/Person");

//Load profile model
const Profile = require("../../models/Profile");

const jwt = require("../../strategies/jsonwtStrategy").JwtStrategy;
//@type GET
//@route /api/profile
//@desc route for personal user profile
//@access PROFILE
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (!profile) {
            return res.status(404).json({ profilenotfound: "No profile Found" });
          }
          res.json(profile);
        })
        .catch(err => console.log("got some error in profile " + err));
    }
  );
module.exports = router;