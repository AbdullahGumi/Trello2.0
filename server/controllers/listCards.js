const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const ListCard = require("../models/listCard");
const Card = mongoose.model("Card");

const createListCard = async (req, res) => {
  const newListCard = await ListCard.create(req.body);
  res.status(StatusCodes.OK).json({ newListCard });
};

const getAllListCards = async (req, res) => {
  const listCards = await ListCard.find({});
  res.status(StatusCodes.OK).json({ listCards });
};

const deleteListCard = async (req, res) => {
  const { id } = req.params;
  const card = await ListCard.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ card });
};

const updateListCard = async (req, res) => {
  const { id } = req.params;
  const updatedCard = req.body;

  const card = await ListCard.findByIdAndUpdate(
    id,
    { listName: updatedCard.newListTitle },
    {
      new: true,
    }
  );
  const { listName } = card;

  await Card.updateMany(
    { listName: updatedCard.previousListTitle },
    { listName: listName }
  );
  res.status(StatusCodes.OK).json({ card });
};

module.exports = {
  createListCard,
  getAllListCards,
  deleteListCard,
  updateListCard,
};
