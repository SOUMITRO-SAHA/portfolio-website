import { createSlice } from "@reduxjs/toolkit";

interface UserInitialState {
  user: any;
}
const initialState: UserInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
