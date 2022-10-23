const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// get timeline posts (all posts of user's followings)
router.get("/timeline/:userId", async (req, res, next) => {
  if (!req.params.userId) {
    res.status.apply(403).json("userId is needed");
  }

  try {
    // find user and their followings
    const user = await User.findById(req.params.userId);
    const followings = user.followings;
    // find each post associated with the user that the current user is following and push onto array
    let posts = [];
    for (let eachUserId of followings) {
      const postsForUserId = await Post.find({ userId: eachUserId });
      posts.push(postsForUserId);
    }

    //flatten array so easier for client to use the json data
    res.status(200).json(posts.flat());
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get all posts of current user
router.get("/profile/:userId", async (req, res, next) => {
  try {
    // find user and posts
    const user = await User.findById({ _id: req.params.userId });
    const posts = await Post.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// create a post
router.post("/", async (req, res, next) => {
  // check to see if body has userId since its required
  if (req.body.userId) {
    try {
      // create new post with all the data from body
      const post = new Post(req.body);
      const savedPost = await post.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("need userId associated with making new post");
  }
});

// update a post
router.put("/:id", async (req, res, next) => {
  try {
    // find post and check whether userId matches the user whos trying to update
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("post updated");
    } else {
      res.status(403).json("you can only update your own posts");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// delete a post
router.delete("/:id", async (req, res, next) => {
  try {
    // find post and check whether userId matches the user whos trying to delete
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("you can only delete your own posts");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// like or dislike a post
router.put("/:id/like", async (req, res, next) => {
  try {
    // find post
    const post = await Post.findById(req.params.id);
    const currentUser = req.body.userId;

    // check when user already liked this post
    if (!post.likes.includes(currentUser)) {
      // add current user to post's likes array
      await Post.findByIdAndUpdate(req.params.id, {
        $push: { likes: currentUser },
      });
      res.status(200).json("user liked this post");
    } else {
      // remove current user from post's likes array
      await Post.findByIdAndUpdate(req.params.id, {
        $pull: { likes: currentUser },
      });
      res.status(200).json("user disliked this post");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get a post
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
