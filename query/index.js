const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//data is here
const posts = {};
//routes
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  //get data from request and put it into DB
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    //insert in data structure
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, postId, content } = data;
    posts[postId].comments.push({ id, content });
  }

  console.log(JSON.stringify(posts));
  //send empty response for ending route
  res.send({});
});

app.listen(4002, () => {
  console.log("Query service running on 4002");
});
