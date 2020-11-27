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

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<CircularProgress />}>
          <AppNavigator />
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
