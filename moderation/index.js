const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  //Moderate if comment is just created
  if (type === "CommentCreated") {
    //moderation logic if include 'orange' reject
    const status = data.content.includes("orange") ? "rejected" : "approved";
    //emit event to route of event bus
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation server listen on port 4003");
});
