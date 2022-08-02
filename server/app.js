require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
app.use(express.json());
app.use(cors());

//routes
// const cardsRouter = require("./routes/cards");
// const listCardsRouter = require("./routes/listCard");
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// app.use("/api/cards", cardsRouter);
// app.use("/api/listCards", listCardsRouter);

const start = async () => {
  const port = process.env.PORT || 5000;

  try {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
    await connectDB(process.env.MONGO_URI);
  } catch (e) {
    console.log(e);
  }
};

start();
