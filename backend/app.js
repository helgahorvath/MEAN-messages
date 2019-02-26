const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://"
  + process.env.USER +":"
  + process.env.PASSWORD
  +"@cluster0-ys8kt.mongodb.net/node-angular?retryWrites=true")
  .then(console.log("SUCCESS"))
  .catch((e) => console.log(e));


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: "Post added successfully",
      postId: result._id
    })
  })});

  app.put("/api/posts/:id", (req, res) => {
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post)
      .then(result => {
        res.status(200).json({message: "Update successful"})
      });
  });

  app.get("/api/posts", (req, res) => {
    Post.find().then(documents => {
      res.status(200).json(
        {
          message: "Success",
          posts: documents
        });
    })
  });

  app.delete("/api/posts/:id", (req, res) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      res.status(200).json(
        {
          message: "Post deleted"
        })
    })
  });

  app.get("/api/posts/:id", (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if(post) {
          res.status(200).json(post)
        } else {
          res.status(404).json({message: "Post not found"})
        }
      })
  });

module.exports = app;
