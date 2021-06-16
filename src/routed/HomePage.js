/*
    Esta prova consiste em acrescentar um novo componente/página ao projeto Karangos.

    1. Copie este arquivo para a pasta src/routed.

    2. Copie o arquivo "vintage-cars.png" para a pasta src.

    3. Altere o arquivo "Apps.js" e adicione um novo Route, com o valor path="/". Assegure-se de que esse novo Route seja 
    POSICIONADO ANTES de todos os outros. Faça com que o componente HomePage seja carregado pelo novo Route. Dessa forma, 
    o componente será exibido logo no início. 

    4. Usando um título de primeiro nível e parágrafos, coloque o seguinte texto no componente:

        Sobre o projeto Karangos

        Karangos é um projeto front-end desenvolvido pelo Prof. Fausto Cintra juntamente com a turma do 4º semestre noturno de ADS da Fatec Franca.
            
        Seu objetivo é demonstrar as funcionalidades e possibilidades do React em conjunto com a biblioteca de componentes Material UI, acessando uma API REST remota.
            
        Clique sobre ícone do menu no canto superior esquerdo para acessar as funcionalidades.

    5. Adicione mais um parágrafo, e, dentro dele, um botão com a cor "secondary" e o texto "Surpresa!".
    
    6. Faça as modificações necessárias na tag <img> para que a imagem "vintage-cars.png" seja exibida.

    7. Aplique as classes de estilo definidas em useStyles nos lugares apropriados.

    8. Crie uma variável de estado chamada "visible", e coloque seu valor inicial como false.

    9. Ao clicar no botão criado no passo 5, a variável "visible" deve inverter seu valor (ou seja,  de true para false ou de false para true). Veja, na animação contida no arquivo "resultado.gif", o resultado pretendido.  

    10. Coloque os arquivos "App.js" e "HomePage.js" em um ZIP para fazer a entrega da prova.
*/

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import vintageCarsImg from "../vintage-cars.png";
import yellow from "@material-ui/core/colors/yellow";
import pink from "@material-ui/core/colors/pink";

const useStyles = makeStyles({
  figura: {
    display: "block",
    margin: "0 auto",
    transition: "opacity 1s linear",
  },
  paragBotao: {
    textAlign: "center",
  },

  primary: {
    backgroundColor: yellow[500],
  },
  secondary: {
    color: "white",
    fontSize: "1.1vw",
    backgroundColor: pink[500],
    cursor: "pointer",
  },
});

export default function HomePage() {
  const classes = useStyles();

  const [visible, setvisible] = useState(false);

  function switchVisibility() {
    setvisible(!visible); // atualiza variável
  }

  return (
    <>
      <h1>Sobre o projeto Karangos</h1>
      <p>
        {" "}
        Karangos é um projeto front-end desenvolvido pelo Prof. Fausto Cintra
        juntamente com a turma do 4º semestre noturno de ADS da Fatec Franca.
      </p>
      <p>
        Seu objetivo é demonstrar as funcionalidades e possibilidades do React
        em conjunto com a biblioteca de componentes Material UI, acessando uma
        API REST remota.
      </p>
      <p>
        Clique sobre ícone do menu no canto superior esquerdo para acessar as
        funcionalidades.
      </p>
      <p className={classes.paragBotao}>
        <button
          variant="contained"
          type="submit"
          className={classes.secondary}
          onClick={switchVisibility}
        >
          Surpresa!{" "}
        </button>
      </p>
      <img
        alt="Carros antigos"
        className={classes.figura}
        src={vintageCarsImg}
        style={{
          opacity: visible ? "1" : "0",
          height: visible ? "591px" : "0",
        }}
      />
    </>
  );
}
