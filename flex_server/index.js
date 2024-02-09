const mongoose = require("mongoose");
const os = require("os");
const dotenv = require("dotenv");
const ip = require("ip");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

let server;
// Get the host name
const hostname = os.hostname();
console.log(hostname);

switch (hostname) {
  case "LAPTOP-CGMRD4JG":
    dotenv.config({ path: "./dev.env" });
    break;
  case "LAPTOP-GH39SS9C":
    dotenv.config({ path: "./dev.env" });
    break;
  case "PAAPRIFLEX":
    dotenv.config({ path: "./prod.env" });

  default:
    dotenv.config({ path: "./dev.env" });
}

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    // Write here....
  })
  .then((connection) => {
    console.log("DB connection successful!");

    const app = require("./app");

    const port = process.env.PORT || 2025;
    server = app.listen(port, ip.address(), () => {
      let host = server.address().address;
      let port = server.address().port;
      console.log(
        `App running on %s mode at http://%s:%s`,
        process.env.NODE_ENV,
        host,
        port
      );
    });
  });

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
