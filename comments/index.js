const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.status(200).send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  //emit event to event bus
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });
  res.status(201).send(comments);
});

//receiving events from event bus
app.post("/events", async (req, res) => {
  console.log("received event: ", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    //get comment from data structure
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.id === id);
    //update comment in comments DB
    comment.status = status;
    //tell other services for update
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: { id, postId, content, status },
    });
  }
  res.send({});
});
app.listen(4001, () => {
  console.log("Comments server listen on port 4001");
});
