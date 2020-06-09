const express = require("express");
const router = express.Router();
const Post = require("../../database/models/Post");
// Passport is Express-compatible authentication middleware for Node.js.
// authenticate requests
const passport = require("passport");
const validatePostInput = require("../validation/post");

// To authenticate (or to make any route private) 
// adding the following middleware code as the middle argument of the function.
passport.authenticate('jwt', {session:false});

// Fetch all the posts
// This is a private route
router.get(
   "/",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      Post.find({ author: req.user.user_name })
         .then(posts => res.status(200).json(posts))
         .catch(err =>
            res
               .status(400)
               .json({ user: "Error fetching posts of logged in user" })
         );
   }
);

// Fetch individiual post by id
router.get("/post/:id", (req, res) => {
    console.log(req.params.id);
   Post.find({ _id: req.params.id })
      .then(post => res.status(200).json(post))
      .catch(err => res.status(400).json({ id: "Error fetching post by id" }));
});

// Fetch all the posts by author
router.get("/author/:author", (req, res) => {
   Post.find({ author: req.params.author })
      .then(posts => res.status(200).json(posts))
      .catch(err =>
         res
            .status(400)
            .json({ author: "Error fetching posts of specific author" })
      );
});

// Create the post
// This is a private route
router.post(
   "/create",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      console.log('Priya',req.body);
      const author = req.user.user_name;
      const post = req.body;
      const { errors, isValid } = validatePostInput(post);
      if (!isValid) {
         return res.status(400).json(errors);
      }
      post.author = author;
      const newPost = new Post(post);
      newPost
         .save()
         .then(doc => res.json(doc))
         .catch(err => console.log({ create: "Error creating new post" }));
   }
);

// Update the post
// This is a private route
router.patch(
   "/update/:id",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      const author = req.user.user_name;
      console.log('Priyaaaaaaaaaa', req.body);
      const { errors, isValid } = validatePostInput(req.body);
      //console.log(isValid);
      if (!isValid) {
         return res.status(400).json(errors);
      }
      const { title, body } = req.body;
      Post.findOneAndUpdate(
         { author, _id: req.params.id },
         { $set: { title, body } },
         { new: true }
      )
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ update: "Error updating existing post" })
         );
   }
);

// Delete the post
// This is a private route
router.delete(
   "/delete/:id",
   passport.authenticate("jwt", { session: false }),
   (req, res) => {
      const author = req.user.user_name;
      Post.findOneAndDelete({ author, _id: req.params.id })
         .then(doc => res.status(200).json(doc))
         .catch(err =>
            res.status(400).json({ delete: "Error deleting a post" })
         );
   }
);

module.exports = router;

