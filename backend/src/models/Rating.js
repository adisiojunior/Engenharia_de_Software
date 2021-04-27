const { Schema, SchemaTypes, model } = require('../database/index')

const RatingSchema = new Schema({
    stars : {
        type: Number,
        require: true
    },
    description : {
        type: String
    },
    createdAt : {
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
    }
});

const Rating = model('Rating', RatingSchema);

module.exports = Rating;

