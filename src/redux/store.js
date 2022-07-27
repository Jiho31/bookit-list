import { configureStore } from "@reduxjs/toolkit";
import memosReducer from "./memos";
import categoriesReducer from "./categories";

export default configureStore({
  reducer: { memos: memosReducer, categories: categoriesReducer },
});
