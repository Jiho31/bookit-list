import { configureStore } from "@reduxjs/toolkit";
import memosReducer from "./memos";
import bookshelvesReducer from "./bookshelves";
import usersReducer from "./users";

export default configureStore({
  reducer: {
    memos: memosReducer,
    bookshelves: bookshelvesReducer,
    users: usersReducer,
  },
});
