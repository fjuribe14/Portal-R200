const app = require("./app");

// start database
const { createConnection } = require("./db/db");
createConnection();

// start server
async function server() {
  const port = app.get("port");
  await app.listen(port);
  console.log("server on port", port);
}
server();
