const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./mongodb/connect");

const userRoute = require("./routes/user.route");
const propertyRoute = require("./routes/property.route");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send({ status: "Api working" });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/properties", propertyRoute);

const startServer = async () => {
  try {
    connectDb(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
