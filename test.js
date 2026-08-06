const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.cluster0.ork9t0f.mongodb.net", (err, records) => {
  console.log(err);
  console.log(records);
});

dns.resolve4("google.com", (err, records) => {
  console.log("Google:", err, records);
});