const mongoose = require('mongoose');

const psychologistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, default: 0 },
});

module.exports = mongoose.model('Psychologist', psychologistSchema);
