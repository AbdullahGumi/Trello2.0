const express = require("express");

const router = express.Router();

const {
  createListCard,
  getAllListCards,
  deleteListCard,
  updateListCard,
} = require("../controllers/listCards");

router.route("/").post(createListCard).get(getAllListCards);

router.route("/:id").delete(deleteListCard).put(updateListCard);

module.exports = router;
