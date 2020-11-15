const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const title = req.body;
  posts[id] = {
    id,
    title,
  };
  //emit event to event bus
  //change address to k8s service name
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.send(posts[id]);
});
//receiving events from event bus
app.post("/events", (req, res) => {
  console.log("received event: ", req.body.type);
  res.send({});
});
app.listen(4000, () => {
  console.log("update");
  console.log("Posts server listen on port 4000");
});
