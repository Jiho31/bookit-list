import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  booksId: [],
  createdAt: null,
  lastUpdated: null,
  createdBy: null,
};

const bookshelvesAdapter = createEntityAdapter();

export const bookshelvesSlice = createSlice({
  name: "bookshelves",
  initialState: bookshelvesAdapter.getInitialState(),
  reducers: {
    createBookshelf: (state, action) => {
      // state.data.push(action.payload);
      // console.log(state);
      console.log(action.payload);
      bookshelvesAdapter.addOne(state, action.payload);
    },
    updateBookshelf: (state, action) => {
      bookshelvesAdapter.setOne(state, action.payload);
    },
    removeBookshelf: (state, action) => {
      bookshelvesAdapter.removeOne(state, action.payload);
    },
    addBook: (state, action) => {},
  },
});

export const { createBookshelf, updateBookshelf, removeBookshelf } =
  bookshelvesSlice.actions;
export const {
  selectAll: selectAllBookshelves,
  selectEntities: selectBookshelvesEntities,
  selectTotal: selectBookshelvesLength,
  selectById: selectBookshelfById,
} = bookshelvesAdapter.getSelectors((state) => state.bookshelves);

export default bookshelvesSlice.reducer;
