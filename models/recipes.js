const mongoose = require('mongoose');
const random = require('mongoose-random');

const Schema = mongoose.Schema;

const recipesSchema = new Schema({
  title : String,
  image : String,
  description : String,
  author:{
     authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
     },
     authorName: String
  },

});
recipesSchema.plugin(random);

module.exports = mongoose.model('recipes',recipesSchema);
