const database = require("../../config/database-connection");

const TABLE = { simple: "Usuario", owner: "Proprietario" };

module.exports = (app) => {
  const controller = {};

  controller.loginUser = async (req, res) => {
    const { body } = req;

    const strSimple = [
      `SELECT * FROM ${TABLE.simple}`,
      `WHERE email = '${body.email}' AND senha = '${body.password}'`,
    ];

    const strOwner = [
      `SELECT * FROM ${TABLE.owner}`,
      `WHERE email = '${body.email}' AND senha = '${body.password}'`,
    ];

    const simple = await database.select(strSimple);
    const owner = await database.select(strOwner);

    if (simple.length > 0) {
      res.status(200).json({
        id: simple[0].idUsuario,
        type: "simple",
      });

      return;
    }

    if (owner.length > 0) {
      res.status(200).json({
        id: owner[0].idProprietario,
        type: "owner",
      });

      return;
    }

    res.status(200).json({
      id: false,
    });
  };

  controller.currentUser = async (req, res) => {
    const { query } = req;

    const str = [
      `SELECT * FROM ${TABLE[query.type]}`,
      `WHERE id${TABLE[query.type]} = ${query.id}`,
    ];

    const user = await database.select(str);

    if (user.length > 0) {
      user[0].type = query.type;
      delete user[0].senha;
      console.log(user);

      res.status(200).json(user);
    } else {
      res.status(200).json([]);
    }
  };

  controller.signInSimpleUser = async (req, res) => {
    const { body } = req;

    console.log(body);

    const str = [
      `INSERT INTO ${
        TABLE[body.type]
      } (nome, email, senha, dataNascimento, telefone)`,
      `VALUES (?, ?, ?, ?, ?)`,
    ];

    const values = [
      body.nome,
      body.email,
      body.senha,
      body.dataNascimento || null,
      body.telefone || null,
    ];

    await database.insert(str, values);

    res.status(200).json();
  };

  controller.signInOwnerUser = async (req, res) => {
    const { body } = req;

    const ins = [
      `INSERT INTO ${
        TABLE[body.type]
      } (nome, email, senha, dataNascimento, telefone, endereco)`,
      `VALUES (?, ?, ?, ?, ?, ?)`,
    ];

    const values = [
      body.nome,
      body.email,
      body.senha,
      body.dataNascimento || null,
      body.telefone || null,
      body.endereco || null,
    ];

    await database.insert(ins, values);

    const sel = [
      `SELECT * FROM ${TABLE[body.type]}`,
      `WHERE nome = '${body.nome}' AND email = '${body.email}' AND senha = '${body.senha}'`,
    ];

    const user = await database.select(sel);

    res.status(200).json(user);
  };

  controller.changePassword = async (req, res) => {
    const { body } = req;

    const str = [
      `UPDATE ${TABLE[body.type]} SET senha = '${body.newPass}'`,
      `WHERE email = '${body.email}' AND senha = '${body.senha}'`,
    ];

    await database.update(str);

    res.status(200).json();
  };

  return controller;
};
