const axios = require("axios");
const database = require("../../config/database-connection");

const TABLE = "Terreno";
const geocoder =
  "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAw1B6LaUyXHGVE79nytfvu1DeACNOw5Ec&address=";

module.exports = (app) => {
  const controller = {};

  controller.signInMarker = async (req, res) => {
    const { body } = req;

    const dataGeocoder = `${body.endereco.replaceAll(
      " ",
      "+"
    )},${body.cidade.replaceAll(" ", "+")},${body.estado.replaceAll(
      " ",
      "+"
    )},${body.cep.replaceAll(" ", "+")}`;

    const resGeocoder = await axios.get(geocoder + dataGeocoder);

    if (resGeocoder.data) {
      const { lat, lng } = resGeocoder.data.results[0].geometry.location;

      const values = [
        body.fk_Proprietario_idPropretario,
        body.endereco,
        body.cep,
        body.cidade,
        body.estado,
        body.prazo,
        body.horta,
        body.status,
        lat,
        lng,
      ];
      console.log(values);

      const ins = [
        `INSERT INTO ${TABLE} (fk_Proprietario_idPropretario, endereco, cep, cidade, estado, prazo, horta, status, lat, lng)`,
        `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ];

      await database.insert(ins, values);
    }
    res.status(200).json({});
  };

  controller.getMarkers = async (req, res) => {
    const sel = [`SELECT * FROM ${TABLE}`];
    const select = await database.select(sel);

    res.status(200).json(select);
  };

  controller.getCommunity = async (req, res) => {
    const { query } = req;

    console.log(query);

    const sel = [
      `SELECT * FROM ${TABLE}`,
      `WHERE fk_Proprietario_idPropretario = ${query.id}`,
    ];
    const select = await database.select(sel);

    console.log(select);

    res.status(200).json(select);
  };

  return controller;
};
