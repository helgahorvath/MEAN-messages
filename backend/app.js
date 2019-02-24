const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

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
