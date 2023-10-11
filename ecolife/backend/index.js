const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());
const db = require("./models");

// routers
const electricityRouter = require("./routes/Electricity");
app.use("/electricity", electricityRouter);

const gasRouter = require("./routes/Gas"); // Import Gas router
app.use("/gas", gasRouter);

const postcodesRouter = require("./routes/Postcodes"); // Import Postcodes router
app.use("/postcodes", postcodesRouter);
//security header define here
app.use((req, res, next) => {
  res.header('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-Content-Type-Options', 'nosniff');
  // Other headers can be added here
  next();
});

db.sequelize.sync().then(() => {
  app.listen(3004, () => {
    console.log("Server running on port 3004");
  });
});
