import { ICategory } from "./../utility/interface";
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema<ICategory>(
  {
    id: {
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;