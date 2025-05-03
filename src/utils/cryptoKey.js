import crypto from "crypto";

const cryptoKey = crypto.randomBytes(32).toString("hex");
console.log(cryptoKey);
