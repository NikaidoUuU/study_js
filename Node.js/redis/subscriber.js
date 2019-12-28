import express from "express";
import redis from "redis";

const subscriber = redis.createClient();

subscriber.on("message", (channel, message) => {
  console.log(`Received data: ${message}`);
});

subscriber.subscribe("subscriber-noitfy");

const app = exrpess();
let count = 0;

app.get("/", (req, res) => {
  res.send(`Subscriber ${++count}`);
});

app.listen(6000, () => console.log("Running at PORT 6000"));
