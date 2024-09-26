const mysql = require("mysql2/promise");

const connect = async () => {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;

  const connection = await mysql.createConnection(
    "mysql://root:1010@localhost:3306/GreenComm"
  );

  global.connection = connection;
  return connection;
};

async function select(query) {
  const conn = await connect();
  const [rows] = await conn.query(query.join(" "));
  return rows;
}

async function insert(query, values) {
  const conn = await connect();
  return await conn.query(query.join(" "), values);
}

async function update(query) {
  const conn = await connect();
  const [rows] = await conn.query(query.join(" "));
  return rows;
}

module.exports = { select, insert, update };
