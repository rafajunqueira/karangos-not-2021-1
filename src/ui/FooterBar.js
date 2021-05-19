import React from "react";
import { Typography, Toolbar } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles/";

import { yellow } from "@material-ui/core/colors/";

import PizzaIcon from "@material-ui/icons/LocalPizza";

const useStyles = makeStyles((theme) => ({
  text: {
    backgroundColor: yellow,
    width: "100%",
    color: "white",
  },
  toolbar: {
    backgroundColor: "#111",
    padding: "0.5rem",
    bottom: "0",
  },
  link: {
    color: theme.palette.secondary.light,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
      color: theme.palette.secondary.main,
    },
  },
}));

export default function FooterBar() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant="caption" align="center" className={classes.text}>
        Desenvolvido por{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/rafael-junqueira94/"
          className={classes.link}
        >
          Rafael J.
        </a>{" "}
        fueled by 2 pizzas de calabresa com catupiry{" "}
        <PizzaIcon fontSize="small"></PizzaIcon>
      </Typography>
    </Toolbar>
  );
}
