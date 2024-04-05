import mongoose from "mongoose";

const BooksDetailSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  ISBN: String,
  availability: Boolean
},{timestamps: true});

export default mongoose.model('BooksDetail',BooksDetailSchema);