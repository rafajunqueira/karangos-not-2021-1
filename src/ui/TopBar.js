import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core/";
import logo from "../img/karangos.png";
import MainMenu from "./MainMenu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: "300px",
    height: "auto",
  },
}));

export default function TopBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MainMenu />
          <Link to="/">
            <img src={logo} className={classes.logo} alt="Logotipo"></img>
          </Link>
          <Typography variant="h6" color="inherit"></Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
