import "fontsource-roboto";

import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { pink, yellow } from "@material-ui/core/colors/";

import TopBar from "./TopBar.js";
import SimpleContainer from "./Container";

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

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <>
          <TopBar></TopBar>
          <SimpleContainer>
          </SimpleContainer>
        </>
      </div>
    </ThemeProvider>
  );
}

export default App;
