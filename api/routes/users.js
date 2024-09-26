module.exports = (app) => {
  const controller = app.controllers.users;

  // Usuário
  app.route("/community-manager/loginUser").post(controller.loginUser);
  app.route("/community-manager/currentUser").get(controller.currentUser);
  app
    .route("/community-manager/signInSimpleUser")
    .post(controller.signInSimpleUser);
  app.route("/community-manager/signInOwner").post(controller.signInOwnerUser);
  app
    .route("/community-manager/changePassword")
    .post(controller.changePassword);
};
