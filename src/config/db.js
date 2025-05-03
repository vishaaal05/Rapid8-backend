const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    return await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
