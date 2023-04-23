const redis = require("redis");

const client = redis.createClient({
  password: "zKgPvQTBxtX1UU67pIEZWxsNvZkoX2Nz",
  socket: {
    host: "redis-18355.c56.east-us.azure.cloud.redislabs.com",
    port: 18355,
  },
});

(async () => {
  client.on("connect", function () {
    console.log("Redis client connected");
  });

  client.on("error", function (err) {
    console.log("Something went wrong " + err);
  });

  await client.connect();
})();

module.exports = client;