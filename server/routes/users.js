const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//get a user
router.get("/", async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    // check which query is in url and search db accordingly
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    // so we dont send unneeded info to client
    if (!user) {
      return res.status(403).json("cannot find user");
    }
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//update user
router.put("/:id", async (req, res, next) => {
  // check to see if user is updating own account or is an admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // if password is inputted, need to hash before saving to db
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err.message);
      }
    }

    // update the user with data (eg: desc, profilePicture, followers, etc)
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json("you can only update your own account");
  }
});

//delete user
router.delete("/:id", async (req, res, next) => {
  // check to see if user is updating own account or is an admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user deleted");
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you can only delete your own account");
  }
});

//get user followings
router.get("/:id/followings", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const followings = user.followings;
    let result = [];
    for (let userId of followings) {
      const userObj = await User.findById(userId);
      result.push(userObj);
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//follow a user
router.put("/:id/follow", async (req, res, next) => {
  // check to see if you're trying to follow yourself
  if (req.body.userId !== req.params.id) {
    try {
      // find current user and the user you want to follow
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // check to see if this user is already followed by you
      if (!user.followers.includes(req.body.userId)) {
        // push to followings array for current user and vice versa
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you are already following this user");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you cannot follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res, next) => {
  // check to see if trying to unfollow yourself
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // see if current user is currently following user
      if (currentUser.followings.includes(req.params.id)) {
        // filter out user from current user followings array
        const newFollowings = currentUser.followings.filter(
          (id) => id !== req.params.id
        );
        // filter out current user from user followers array
        const newFollowers = user.followers.filter(
          (id) => id !== req.body.userId
        );
        // update with new followers and followings for both users
        await User.findByIdAndUpdate(req.body.userId, {
          $set: { followings: newFollowings },
        });
        await User.findByIdAndUpdate(req.params.id, {
          $set: { followers: newFollowers },
        });
        res.status(200).json("unfollowed user");
      } else {
        res.status(403).json("you are not following this user");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you cannot unfollow yourself");
  }
});

module.exports = router;
