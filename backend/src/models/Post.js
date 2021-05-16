const {SchemaTypes} = require('../database/index')
const mongoose = require("mongoose");
const aws = require("aws-sdk");
const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId : {
    type: SchemaTypes.ObjectId,
    require : true
  },
  serviceId : {
    type: SchemaTypes.ObjectId,
    require : true
  },
});

PostSchema.pre("remove", function() {
    if (process.env.STORAGE_TYPE === "s3") {
        return s3.deleteObject({
            Bucket: "uploadtestando",
            Key: this.key,
        }).promise()
    }
})

module.exports = mongoose.model("Post", PostSchema);