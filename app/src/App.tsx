import React, { Suspense } from "react";
import { Provider } from "react-redux";
import {
  CssBaseline,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";
import AppNavigator from "./navigation/AppNavigator";
import theme from "./style/theme";
import store from "./state/store";
import { SnackbarProvider } from "notistack";
import Notifier from "components/Notifier";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<CircularProgress />}>
          <SnackbarProvider
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            autoHideDuration={3000}
          >
            <Notifier />
            <AppNavigator />
          </SnackbarProvider>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
