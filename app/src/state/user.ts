import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = null | {
  id: string;
  // userName: string
  // displayName: string
  // firstName: string
  // lastName: string
  // deidentified: boolean
};

const initialState: UserState = { id: "123456" };

// Logout action is defined outside of the userSlice because it is being used by all reducers
export const logout = createAction("LOGOUT");

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    login: (state: UserState, action: PayloadAction<UserState>) => {
      debugger;
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });
  },
});

export default userSlice.reducer;
export const { login } = userSlice.actions;
