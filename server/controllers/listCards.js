const { StatusCodes } = require("http-status-codes");

const listCard = require("../models/listCard");

const createListCard = async (req, res) => {
  const newListCard = await listCard.create(req.body);
  res.status(StatusCodes.OK).json({ newListCard });
};

const getAllListCards = async (req, res) => {
  const listCards = await listCard.find({});
  res.status(StatusCodes.OK).json({ listCards });
};

const deleteListCard = async (req, res) => {
  const { id } = req.params;
  const card = await listCard.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ card });
};

const updateListCard = async (req, res) => {
  const { id } = req.params;
  const updatedCard = req.body;
  const card = await listCard.findByIdAndUpdate(id, updatedCard, { new: true });
  res.status(StatusCodes.OK).json({ card });
};

module.exports = {
  createListCard,
  getAllListCards,
  deleteListCard,
  updateListCard,
};
