const { StatusCodes } = require("http-status-codes");

const Card = require("../models/Card");

const createCard = async (req, res) => {
  const newCard = await Card.create(req.body);
  res.status(StatusCodes.OK).json({ newCard });
};

const getAllCards = async (req, res) => {
  const cards = await Card.find({});
  res.status(StatusCodes.OK).json({ cards });
};

const getCard = async (req, res) => {
  const { id } = req.params;
  const card = await Card.findById(id);
  res.status(StatusCodes.OK).json({ card });
};

const deleteCard = async (req, res) => {
  const { id } = req.params;
  const card = await Card.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ card });
};

const updateCard = async (req, res) => {
  const { id } = req.params;
  const updatedCard = req.body;
  const card = await Card.findByIdAndUpdate(id, updatedCard, { new: true });
  res.status(StatusCodes.OK).json({ card });
};

module.exports = {
  createCard,
  getAllCards,
  getCard,
  deleteCard,
  updateCard,
};
