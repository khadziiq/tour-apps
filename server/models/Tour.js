import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  desc: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Tour", tourSchema);
