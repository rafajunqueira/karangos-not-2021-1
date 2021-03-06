import React from "react";
import TopBar from "./ui/TopBar.js";
import FooterBar from "./ui/FooterBar.js";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import yellow from "@material-ui/core/colors/yellow";
import pink from "@material-ui/core/colors/pink";

//HomePage (Prova 2)

import HomePage from "./routed/HomePage";

//Karangos
import KarangosList from "./routed/KarangosList2.js";
import KarangosForm from "./routed/KarangosForm.js";
// CLientes
import ClientesList from "./routed/ClientesList2";
import ClientesForm from "./routed/ClientesForm";



const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    paddingBottom: "42px",
  },
  routed: {
    padding: "24px",
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
}));

function Main() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <BrowserRouter>
        <TopBar />
        <Box id="routed" className={classes.routed}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/list">
              <KarangosList />
            </Route>
            <Route path="/new">
              <KarangosForm />
            </Route>
            <Route path="/listcliente">
              <ClientesList />
            </Route>
            <Route path="/newcliente">
              <ClientesForm />
            </Route>
          </Switch>
        </Box>
        <FooterBar />
      </BrowserRouter>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
