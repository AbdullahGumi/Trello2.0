const express = require("express");

const router = express.Router();

const {
  createCard,
  getAllCards,
  getCard,
  deleteCard,
  updateCard,
} = require("../controllers/cards");

router.route("/").post(createCard).get(getAllCards);

router.route("/:id").get(getCard).delete(deleteCard).put(updateCard);

module.exports = router;
