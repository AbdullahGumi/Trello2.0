require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
app.use(express.json());

//routes
const cardsRouter = require("./routes/cards");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/api/cards", cardsRouter);

const start = async () => {
  const port = 3000;

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
