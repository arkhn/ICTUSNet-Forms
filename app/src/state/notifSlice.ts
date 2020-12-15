import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OptionsObject } from "notistack";

type Notification = {
  key: string;
  message: string;
  options?: OptionsObject;
  dismissed?: boolean;
};

interface NotifState {
  notifications: Notification[];
}

const initialState: NotifState = {
  notifications: [],
};

const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    enqueueSnackbar: (
      state: NotifState,
      action: PayloadAction<{
        key?: string;
        message: string;
        options?: OptionsObject;
        dismissed?: boolean;
      }>
    ) => {
      const notif = action.payload;
      state.notifications.push({
        ...notif,
        key: notif.key || (new Date().getTime() + Math.random()).toString(),
      });
    },
    closeSnackbar: (
      state: NotifState,
      action: PayloadAction<string | undefined>
    ) => {
      const key = action.payload;
      const dismissAll = !key;
      state.notifications = state.notifications.map((notif) =>
        dismissAll || notif.key === key
          ? { ...notif, dismissed: true }
          : { ...notif }
      );
    },
    removeSnackbar: (state: NotifState, action: PayloadAction<string>) => {
      const key = action.payload;
      state.notifications = state.notifications.filter(
        (notif) => notif.key !== key
      );
    },
  },
});

export default notifSlice.reducer;
export const {
  closeSnackbar,
  enqueueSnackbar,
  removeSnackbar,
} = notifSlice.actions;
