import express from "express";
import redis from "redis";
import fetch from "node-fetch";

const app = express();

const client = redis.createClient();

client.on("error", err => {
  console.error(`Error: ${err}`);
});

app.get("/cache", (req, res) => {
  const redisKey = "post:thumbnailUrl";
  return client.get(redisKey, (err, res) => {
    if (err) console.error(err);
    if (res) {
      // 캐시가 존재하면 네트워크 요청이 생략됨
      return res.json({ type: "cached", data: JSON.parse(res) });
    } else {
      // 캐시가 존재하지 않을 경우
      fetch("https://jsonplaceholder.typicode.com/photo")
        .then(res => res.json())
        .then(res => {
          client.set(redisKey, JSON.stringify(res));
          return res.json({ type: "onfly", data: res });
        });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Running at PORT ${PORT}`));
