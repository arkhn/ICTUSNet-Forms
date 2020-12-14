import React from "react";
import { useAppSelector, useAppDispatch } from "state/store";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "state/notifSlice";
import { useTranslation } from "react-i18next";

let displayed: string[] = [];

const Notifier: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notif);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const storeDisplayed = (id: string) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: string) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(t(message), {
          key,
          ...options,
          onClose: (event, reason, myKey) =>
            options.onClose && options.onClose(event, reason, myKey),
          onExited: (event, myKey) => {
            // remove this snackbar from redux store
            dispatch(removeSnackbar(myKey.toString()));
            removeDisplayed(myKey.toString());
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, t, dispatch]);

  return null;
};

export default Notifier;
