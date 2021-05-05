import "fontsource-roboto";
import { makeStyles, Box } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { pink, yellow } from "@material-ui/core/colors/";

import TopBar from "./ui/TopBar";
import FooterBar from "../src/ui/FooterBar";
import KarangosForm from "../src/routed/KarangosForm";
import KarangosList from "../src/routed/KarangosList";

import { BrowserRouter, Route, Switch } from "react-router-dom";

let theme = createMuiTheme({
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
    paddingBottom: "1rem",
    marginBottom: "0.2rem",
    width: "100%vh",
    minHeight: "745px",
    borderTop: "0.3rem solid rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.background.paper,
  },
  routed: {
    padding: "24px",
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontfamily,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <>
          <Box className={classes.box}>
            <BrowserRouter>
              <TopBar />
              <Box className={classes.routed} id="routed">
                <Switch>
                  <Route path="/list">
                    <KarangosList />
                  </Route>
                  <Route path="/new">
                    <KarangosForm />
                  </Route>
                </Switch>
              </Box>
              <FooterBar />
            </BrowserRouter>
          </Box>
        </>
      </div>
    </ThemeProvider>
  );
}

export default App;
