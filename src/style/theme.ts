import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#B7C7DB",
      light: "#e9faff",
      dark: "#8796a9",
    },
    secondary: {
      main: "#90DFBF",
      light: "#F4FCF9",
      dark: "#5fad8f",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Montserrat,sans-serif",
    h1: {
      color: "#394b59",
      fontWeight: "bold",
    },
    h5: {
      color: "#5dba95",
      fontWeight: "bold",
    },
    body1: {
      color: "#868f9b",
    },
  },
});

export default theme;
