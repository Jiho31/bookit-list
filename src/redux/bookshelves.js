import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  id: uuid(),
  name: "To Read",
  books: {
    book1: {
      author: "J. K. Rowling",
      imgSrc:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1169812%3Ftimestamp%3D20200216125011",
      title: "해리포터",
    },
    book512: {
      author: "J. K. Rowling",
      imgSrc:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1169812%3Ftimestamp%3D20200216125011",
      title: "해리포터",
    },
    book44: {
      author: "J. K. Rowling",
      imgSrc:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1169812%3Ftimestamp%3D20200216125011",
      title: "해리포터",
    },
  },
  createdAt: Date.now(),
  lastUpdated: Date.now(),
  createdBy: "user1",
};

const bookshelvesAdapter = createEntityAdapter();

const cache = {};

export const bookshelvesSlice = createSlice({
  name: "bookshelves",
  initialState: bookshelvesAdapter.getInitialState(),
  reducers: {
    createBookshelf: (state, action) => {
      // console.log(state);
      console.log(action.payload);
      const { id } = action.payload;
      bookshelvesAdapter.addOne(state, action.payload);
    },
    updateBookshelf: (state, action) => {
      bookshelvesAdapter.setOne(state, action.payload);
    },
    removeBookshelf: (state, action) => {
      bookshelvesAdapter.removeOne(state, action.payload);
    },
    addBook: (state, action) => {
      console.log(state);
      console.log(action.payload);
    },
  },
});

export const { createBookshelf, updateBookshelf, removeBookshelf, addBook } =
  bookshelvesSlice.actions;
export const {
  selectAll: selectAllBookshelves,
  selectEntities: selectBookshelvesEntities,
  selectTotal: selectBookshelvesLength,
  selectById: selectBookshelfById,
} = bookshelvesAdapter.getSelectors((state) => state.bookshelves);

export default bookshelvesSlice.reducer;
