import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import ButtonDefault from "./Button.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  container: {
    paddingTop: "1rem",
    marginTop: "1rem",
    height: "100vh",
    minWidth: "130vh",
    backgroundColor: "#484848",
  },
}));

export default function SimpleContainer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Container maxWidth="sm" className={classes.container}>
          <Typography component="div" />
          <ButtonDefault className={classes.menuButton}></ButtonDefault>
        </Container>
      </div>
    </React.Fragment>
  );
}
