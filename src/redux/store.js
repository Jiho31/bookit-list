import { configureStore } from "@reduxjs/toolkit";
import memosReducer from "./memos";
import bookshelvesReducer from "./bookshelves";

export default configureStore({
  reducer: { memos: memosReducer, bookshelves: bookshelvesReducer },
});
