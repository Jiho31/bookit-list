import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   id: null,
//   content: "",
//   createdAt: new Date().toISOString().slice(0, 10),
//   category: "",
//   creatorId: "",
// };

const memosAdapter = createEntityAdapter();

export const memosSlice = createSlice({
  name: "memos",
  initialState: memosAdapter.getInitialState(),
  reducers: {
    createMemo: (state, action) => {
      // state.data.push(action.payload);
      memosAdapter.addOne(state, action.payload);
    },
    updateMemo: (state, action) => {
      memosAdapter.setOne(state, action.payload);
    },
    removeMemo: (state, action) => {
      memosAdapter.removeOne(state, action.payload);
    },
  },
});

export const { createMemo, updateMemo, removeMemo } = memosSlice.actions;
export const {
  selectAll: selectAllMemos,
  selectEntities: selectMemosEntities,
  selectTotal: selectMemosLength,
  selectById: selectMemoById,
} = memosAdapter.getSelectors((state) => state.memos);

export default memosSlice.reducer;
