module.exports = (app) => {
  const controller = app.controllers.markers;

  // Terreno
  app.route("/community-manager/signInMarker").post(controller.signInMarker);
  app.route("/community-manager/getMarkers").get(controller.getMarkers);
  app.route("/community-manager/getCommunity").get(controller.getCommunity);
};
