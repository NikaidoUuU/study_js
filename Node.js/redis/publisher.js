import express from "express";
import redis from "redis";

const publisher = redis.createClient();

const app = express();

app.get("/", (req, res) => {
  const data = {
    fullstack: "node"
  };
  publisher.publish("subscriber-noitfy", JSON.stringify(data));
  res.send("Publisher sent an event via Redis");
});

app.listen(8000, () => console.log("Running at PORT 8000"));
