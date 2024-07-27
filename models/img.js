const mongoose = require("mongoose")
const ImageSchema = new mongoose.Schema({
name:String,
 image:String
})
const ImageModel = mongoose.model("mobi-images", ImageSchema)

module.exports = ImageModel;