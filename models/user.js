const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
   name:String,
  mobile:String,
   email:String,
   password:String,
})
const UserModel = mongoose.model("mobiuser", UserSchema)

module.exports = UserModel;