const { SchemaTypes } = require("mongoose");
const mongoose = require("../database/index");

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  street: {
    type: String,
    require: true,
  },

  neighborhood: {
    type: String,
    require: true,
  },

  category: {
    type: Array,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  slogan: {
    type: String,
  },

  cnpj: {
    type: String,
  },
  image: {
    type: Array,
    default: [],
  },
  whatsapp: {
    type: String,
  },

  instagram: {
    type: String,
  },

  email: {
    type: String,
  },
  ratingMean: {
    type: Number,
    default: 0,
  },
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
