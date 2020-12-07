import {
  createAction,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { login as apiLogin } from "utils/api";

export type UserState = null | {
  username?: string;
  refresh?: string;
  access?: string;
  requestId?: string;
  loading?: boolean;
};

const initialState: UserState = null;

// Logout action is defined outside of the userSlice because it is being used by all reducers
const logout = createAction("LOGOUT");

const loginThunk = createAsyncThunk<
  void,
  { username: string; password: string },
  { state: UserState; rejectValue: string | undefined }
>(
  "user/login",
  async ({ password, username }, { dispatch, rejectWithValue }) => {
    const userCredentials = await apiLogin(username, password);
    if (userCredentials.refresh && userCredentials.access) {
      dispatch(
        userSlice.actions.login({
          username,
          refresh: userCredentials.refresh,
          access: userCredentials.access,
        })
      );
    } else {
      rejectWithValue(userCredentials.detail);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    login: (state: UserState, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });
    builder.addCase(loginThunk.pending, (state, { meta }) => {
      return {
        ...state,
        loading: true,
        requestId: meta.requestId,
      };
    });
    builder.addCase(loginThunk.fulfilled, (state, { meta }) => {
      return {
        ...state,
        loading: meta.requestId !== state?.requestId,
      };
    });
    builder.addCase(loginThunk.rejected, (state, { meta, payload }) => {
      console.log("Login rejected with value: ", payload);
      return {
        ...state,
        loading: meta.requestId !== state?.requestId,
      };
    });
  },
});

export default userSlice.reducer;
export { loginThunk, logout };
export const { login } = userSlice.actions;
