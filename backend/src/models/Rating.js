const { Schema, SchemaTypes, model } = require('../database/index')

const RatingSchema = new Schema({
    stars : {
        type: Integer,
        require: true
    },
    description : {
        type: String
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    user_id : {
        type: SchemaTypes.ObjectId,
        require : true
    },
    service_id : {
        type: SchemaTypes.ObjectId,
        require : true
    }
});

const Rating = model('Rating', RatingSchema);

moddule.exports = Rating;

