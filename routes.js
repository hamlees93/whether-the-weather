const express = require(`express`);
const router = express.Router();
const drinkController = require(`./controllers/drinks_controller`);

router.get(`/`, drinkController.index);

module.exports = router;