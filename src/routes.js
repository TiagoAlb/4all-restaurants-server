const express = require('express');
const placeController = require('./controllers/PlaceController');
const dishController = require('./controllers/DishController');
const routes = express.Router();

routes.get("/api/places", placeController.get);

routes.get("/api/places/:id", placeController.getById);

routes.get("/api/places/:id/dishes", dishController.get);

routes.post("/api/places", placeController.create);

routes.post("/api/places/:id/dishes", dishController.create);

module.exports = routes;