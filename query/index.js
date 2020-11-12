const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//data is here
const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    //insert in data structure
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, postId, content, status } = data;
    posts[postId].comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;
    const comment = posts[postId].comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
};
//routes
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  //get data from request and put it into DB
  const { type, data } = req.body;
  handleEvent(type, data);
  // console.log(JSON.stringify(posts));
  //send empty response for ending route
  res.send({});
});

app.listen(4002, async () => {
  console.log("Query service running on 4002");
  //get all events from event bus data store
  const res = await axios.get("http://localhost:4005/events");
  for (let event of res.data) {
    handleEvent(event.type, event.data);
  }
});
