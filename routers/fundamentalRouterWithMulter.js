function getRoute(model, controller, id, options) {
  const express = require("express");
  const route = express.Router();
  const checkAndFindOneWithOnePK = require("../middlewares/checks/checkAndFindOneWithOnePK");
  const checkAndFindAll = require("../middlewares/checks/checkAndFindAll");
  const checkAndSendOneWithPK = require("../middlewares/checks/checkAndSendOneWithPK");
  const multerHelper = require("../helpers/multerHelper");

  const db = require("../models");
  const Controller = require("../controllers/");

  //gerektiginde controllerdaki methodları
  //override edebilmek veya yeni methodlar
  //ekleyebilmek icin disardan controller alabiliyoruz.
  if (!controller) controller = new Controller(model);

  route.post("", multerHelper.save, controller.createWithUrl);
  route.get("", controller.getAll);

  //query
  route.get("/query", controller.getDataByQuery);

  //getAll by another key
  route.get(`/get-by-${id}/:${id}`, checkAndFindAll(model), controller.getById);

  //getById-update-delete witk primary key
  route.get("/:id", checkAndFindOneWithOnePK(model), controller.getById);
  route.post(
    "/cou/:id",
    checkAndSendOneWithPK(model),
    controller.createOrUpdate
  );
  route.put(
    "/:id",
    checkAndFindOneWithOnePK(model),
    multerHelper.save,
    controller.updateWithUrl
  );
  // route.put("/:id", checkAndFindOneWithOnePK(model), controller.update);

  route.delete("/:id", checkAndFindOneWithOnePK(model), controller.delete);

  // getById detailed with primary key
  route.get(
    "/detailed/:id",
    checkAndFindOneWithOnePK(model, options),
    controller.getById
  );

  return route;
}

module.exports = getRoute;
