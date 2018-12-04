const express = require(`express`);
const router = express.Router();
const contactController = require(`./controllers/contact_controller`);

router.get(`/`, contactController.newResource);

module.exports = router;