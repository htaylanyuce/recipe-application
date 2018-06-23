const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  authorId : String,
  authorName :String

});

module.exports = mongoose.model('author',authorSchema);
