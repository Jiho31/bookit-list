import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addUserInfo: (state, action) => {
      usersAdapter.addOne(state, action.payload);
    },
    updateUserInfo: (state, action) => {
      usersAdapter.setOne(state, action.payload);
    },
    removeUserInfo: (state, action) => {
      usersAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addUserInfo, updateUserInfo, removeUserInfo } =
  usersSlice.actions;
export const {
  selectAll: selectAllUsers,
  selectEntities: selectUsersEntities,
  selectTotal: selectUsersLength,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
