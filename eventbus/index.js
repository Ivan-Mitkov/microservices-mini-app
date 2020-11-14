const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//storing all events for sync
const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  //pass event to other services
  //posts-clusterip-srv from clusterIP config
  axios.post("http://posts-clusterip-srv:4000/events", event);
  axios.post("http://comments-srv:4001/events", event);
  axios.post("http://query-srv:4002/events", event);
  axios.post("http://moderation-srv:4003/events", event);
  res.send({ status: "OK" });
});

//retrieve all events
app.get("/events", (req, res) => {
  res.send(events);
});
app.listen(4005, () => {
  console.log("Event bus running on 4005");
});
