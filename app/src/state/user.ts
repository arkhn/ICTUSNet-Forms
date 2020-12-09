import {
  createAction,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { login as apiLogin, logout as apiLogout } from "services/auth";
import { setTokens } from "utils/tokenManager";

export type UserState = null | {
  username?: string;
  refresh?: string;
  access?: string;
  requestId?: string;
  loading?: boolean;
};

const initialState: UserState = null;

/**
 *  Logout action is defined outside of the userSlice because it is being used by all reducers
 */
const logout = createAction("LOGOUT");

/**
 *
 */
const loginThunk = createAsyncThunk<
  void,
  { username: string; password: string },
  { state: UserState; rejectValue: void }
>(
  "user/login",
  async ({ password, username }, { dispatch, rejectWithValue }) => {
    const userCredentials = await apiLogin(username, password);

    if (userCredentials) {
      setTokens(userCredentials);
      dispatch(userSlice.actions.login(userCredentials));
    } else {
      rejectWithValue();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    login: (state: UserState, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      apiLogout();
      return initialState;
    });
    builder.addCase(loginThunk.pending, (state, { meta }) => {
      return {
        ...state,
        loading: true,
        requestId: meta.requestId,
      };
    });
    builder.addCase(loginThunk.fulfilled, (state, { meta, payload }) => {
      return {
        ...state,
        loading: meta.requestId !== state?.requestId,
      };
    });
    builder.addCase(loginThunk.rejected, (state, { meta }) => {
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
