require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 5000;
const mailRouter = require("./routes/mailRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/mail", mailRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT} ....`);
});
