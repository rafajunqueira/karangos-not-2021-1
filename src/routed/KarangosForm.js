import React from "react";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputMask from "react-input-mask";
import InputAdornment from "@material-ui/core/InputAdornment";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: "90%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    "& .MuiFormControl-root": {
      mindWidth: "200px",
      maxWidth: "500px",
      marginBottom: "24px",
    },
  },
  toolbar: {
    marginTop: "36px",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
  checkbox: {
    alignItems: "center",
  },
}));

/* Classes de caracteres de entrada para a máscara do campo placa
    1) Três primeiras posições: qualquer letra, de A a Z (maiúsculo ou minúsculo) ~> [A-Za-z]
    2) Posições numéricas (1º, a 3º e a 4º depois do traço) ~> [0-9]
    3) 2º posição depois do traço: pode receber dígitos ou letras de A a J(maiúsculas ou minúsculas) ~> [0-9A-Ja-j]
*/

//Representando as classes de caracteres de máscara como objeto
const formatChars = {
  A: "[A-Za-z]",
  0: "[0-9]",
  "#": "[0-9A-Ja-j]",
};

//Finalmente, a máscara de entrada do campo placa
const placaMask = "AAA-0#00";

//Máscara para CPF: '000.000.000-0#00
//Máscara para CNPJ: '00.000.000/0000-00'

export default function KarangosForm() {
  const classes = useStyles();

  const [karango, setKarango] = useState({
    id: null,
    marca: "",
    modelo: "",
    cor: "",
    ano_fabricacao: new Date().getFullYear(), //Ano corrente
    importado: "0",
    placa: "",
    preco: 0,
  });
  const [currentId, setCurrentId] = useState();
  const [importadoChecked, setImportadoChecked] = useState();

  const [snackState, setSnackState] = useState({
    open: false,
    severity: "success",
    message: "Karango salvo com sucesso",
  });

  const [btnSendState, setBtnSendState] = useState({
    disabled: false,
    label: "Enviar",
  });

  const [error, setError] = useState({
    marca: "",
    modelo: "",
    cor: "",
    placa: "",
    preco: "",
  });

  const [isModified, setIsModified] = useState(false);

  const history = useHistory();

  function handleInputChange(event, property) {
    const karangoTemp = { ...karango };
    let importadoCheckedTemp = importadoChecked;

    //Se houver id no event.target, ele será o nome da propriedade
    //senão, usaremos o valor do segundo parâmetro
    if (event.target.id) property = event.target.id;

    if (property === "importado") {
      const newState = !importadoChecked;
      //setKarango({...karango, importado: (newState ? '1' : '0')})
      karangoTemp.importado = newState ? "1" : "0";
      //setImportadoChecked(newState)
      importadoCheckedTemp = newState;
    } else if (property === "placa") {
      //setKarango({...karango, [property]: event.target.value.toUpperCase()})
      karangoTemp[property] = event.target.value.toUpperCase();
    } else {
      //Quando o nome de uma propriedade de um objeto aparece entre [],
      //isso se chama 'propriedade calculada". O nome da propriedade vai corresponder
      //à avaliação da expressão entre os colchetes
      //setCurrentId(event.target.id)
      //setKarango({...karango, [property]: event.target.value})
      karangoTemp[property] = event.target.value;
    }
    setKarango(karangoTemp);
    setImportadoChecked(importadoCheckedTemp);
    validate(karangoTemp); // Dispara a validação
  }

  function validate(data) {
    const errorTemp = {
      marca: "",
      modelo: "",
      cor: "",
      placa: "",
      preco: "",
    };
    let isValid = true;

    //trim(): retira as espaços em branco do início e do final de uma string

    // Validação do campo marca
    if (data.marca.trim() === "") {
      errorTemp.marca = "A marca deve ser preenchida";
      isValid = false;
    }

    // Validação do campo modelo
    if (data.modelo.trim() === "") {
      errorTemp.modelo = "O modelo deve ser preenchido";
      isValid = false;
    }

    // Validação do campo cor
    if (data.cor.trim() === "") {
      errorTemp.cor = "Escolha uma cor";
      isValid = false;
    }

    // Validação do campo placa
    // Valor válido não pode ser string nem conter o caractere _
    if (data.placa.trim() === "" || data.placa.includes("_")) {
      errorTemp.placa = "A placa deve ser corretamente preenchida";
      isValid = false;
    }

    // Validação do campo preco
    //Valor válido deve ser numérico e maior do que zero
    if (isNaN(data.preco) || Number(data.preco) <= 0) {
      errorTemp.preco = "O preço deve ser preenchido e maior que zero";
      isValid = false;
    }

    setError(errorTemp);
    return isValid;
  }

  function years() {
    let result = [];
    for (let i = new Date().getFullYear(); i >= 1900; i--) result.push(i);
    return result;
  }

  async function saveData() {
    try {
      // Desabilitar o botão salvar
      setBtnSendState({ disable: true, label: "Enviando..." });

      await axios.post("https://api.faustocintra.com.br/karangos", karango);

      setSnackState({
        open: true,
        severity: "sucess",
        message: "Karango salvo com sucesso",
      });
    } catch (error) {
      setSnackState({
        open: true,
        severity: "error",
        message: "ERRO: " + error.message,
      });
    }
    //Reabilitar o botão enviar
    setBtnSendState({ disable: false, label: "Enviar" });
  }

  function handleSubmit(event) {
    event.preventDefault(); //Evitar o recarregamento da página

    saveData();
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function handleSnackClose(event, reason) {
    // Evita que a snackbar seja fechada clicando-se fora dela
    if (reason === "clickaway") return;
    setSnackState({ ...snackState, open: false }); // Fecha a snackbar

    //Retorna à página de listagem
    history.push("/list"); //Retorna à página de listagem
  }

  return (
    <>
      <Snackbar
        open={snackState.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={snackState.severity}>
          {snackState.message}
        </Alert>
      </Snackbar>

      <h1>Cadastrar Novo Carango</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="marca"
          label="Marca"
          variant="filled"
          value={karango.marca}
          onChange={handleInputChange}
          fullWidth
          required
          error={error.marca !== ""}
          helperText={error.marca}
        />

        <TextField
          id="modelo"
          label="Modelo"
          variant="filled"
          value={karango.modelo}
          onChange={handleInputChange}
          fullWidth
          required
          error={error.modelo !== ""}
          helperText={error.modelo}
        />

        <TextField
          id="cor"
          label="Cor"
          variant="filled"
          value={karango.cor}
          onChange={(event) => handleInputChange(event, "cor")}
          fullWidth
          select
          required
          error={error.cor !== ""}
          helperText={error.cor}
        >
          <MenuItem value="Amarelo">Amarelo</MenuItem>
          <MenuItem value="Azul">Azul</MenuItem>
          <MenuItem value="Bege">Bege</MenuItem>
          <MenuItem value="Branco">Branco</MenuItem>
          <MenuItem value="Cinza">Cinza</MenuItem>
          <MenuItem value="Dourado">Dourado</MenuItem>
          <MenuItem value="Laranja">Laranja</MenuItem>
          <MenuItem value="Marrom">Marrom</MenuItem>
          <MenuItem value="Prata">Prata</MenuItem>
          <MenuItem value="Preto">Preto</MenuItem>
          <MenuItem value="Roxo">Roxo</MenuItem>
          <MenuItem value="Verde">Verde</MenuItem>
          <MenuItem value="Vermelho">Vermelho</MenuItem>
        </TextField>

        <TextField
          id="ano_fabricacao"
          label="Ano de Fabricacao"
          variant="filled"
          value={karango.ano_fabricacao}
          onChange={(event) => handleInputChange(event, "ano_fabricacao")}
          fullWidth
          select
        >
          {years().map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
        </TextField>

        <TextField
          id="preco"
          label="Preço"
          variant="filled"
          value={karango.preco}
          onChange={handleInputChange}
          fullWidth
          type="number"
          onFocus={(event) => event.target.select()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
          required
          error={error.preco !== ""}
          helperText={error.preco}
        />
        <InputMask
          formatChars={formatChars}
          mask={placaMask}
          id="placa"
          onChange={(event) => handleInputChange(event, "placa")}
          value={karango.placa}
        >
          {() => (
            <TextField
              label="Placa"
              variant="filled"
              fullWidth
              required
              error={error.placa !== ""}
              helperText={error.placa}
            />
          )}
        </InputMask>

        <FormControl className={classes.checkbox} fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                checked={importadoChecked}
                onChange={handleInputChange}
                id="importado"
              />
            }
            label="Importado?"
          />
        </FormControl>

        <Toolbar className={classes.toolbar}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disable={btnSendState.disable}
          >
            {btnSendState.label}
          </Button>
          <Button variant="contained">Voltar</Button>
        </Toolbar>

        <div>
          {JSON.stringify(karango)}
          <br />
          currentId: {currentId}
        </div>
      </form>
    </>
  );
}
