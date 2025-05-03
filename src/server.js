require("dotenv").config();

const app = require("./app");
const dbConnect = require("./config/db");

const PORT = process.env.PORT || 5000;

dbConnect().then((res) => {
  if (res.connection.host) {
    console.log("DB connected successfully", res.connection.host);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
