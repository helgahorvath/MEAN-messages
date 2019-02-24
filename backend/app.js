const express = require('express');

const app = express();


app.use("/api/posts", (req, res) => {
  const posts = [
    {
      id: "lskfsl",
      title: "First",
      content: "Coming from the server"
    },
    {
      id: "lskfsl",
      title: "Second",
      content: "Dummy"
    },
  ];
  res.status(200).json(
    {
      message: "Success",
      posts: posts
    });
});

module.exports = app;
