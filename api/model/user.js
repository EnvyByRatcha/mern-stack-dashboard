const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  allProperty: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
