import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Grow,
} from "@material-ui/core";
import { EndText } from "./EndText.jsx";
import { HighlightedText } from "./HighlightedText.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import config from "../../config"


export class SpellChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      originalHighlightedText: " ",
      correctedText: " ",
      errors: [],
      inParam: false,
      isAlertActive: false,
      currentlyDisplayedError: {},
    };
  }

  // ADD SPLICE TO STRING PROTOTYPE
  componentDidMount() {
    String.prototype.splice = function(idx, rem, str) {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
  }

  // HANDLE CHANGE ON TEXTAREA
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  // HANDLE CHANGE THE REQUEST
  handleSend = (e) => {
    e.preventDefault();
    const url = `${config.BASE_URL}/predict/`;
    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        text: this.state.text,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          correctedText: data.corrected_text,
          errors: this.addId(data.errors),
          originalHighlightedText: this.state.text,
          inParam: false,
        });
      })
      .then(() => {
        this.addHighlightedErrors();
        this.animateLabels();
        this.handleMessages();
      })
      .catch((error) => console.log(error));
  };

  addId = (arr) => {
    let id = 100;
    return arr.map((item) => ({
      ...item,
      id: id++,
    }));
  };

  highlightError = (error, i) => {
    const startSpan = `<div class="con-tooltip bottom"> <span id=${error.id}>`;
    const endSpan = `</span> </div>`;
    const spansLength = (startSpan.length + endSpan.length) * i;

    const str = this.state.originalHighlightedText;
    const startPosition = error.offset + spansLength;

    const endPosition = startPosition + error.errorLength;
    const newStr = str.splice(endPosition, 0, endSpan);
    let endStr = newStr.splice(startPosition, 0, startSpan);
    this.setState({
      originalHighlightedText: endStr,
    });
    return startPosition, endPosition;
  };

  addHighlightedErrors = () => {
    let i = 0;
    this.state.errors.map((error) => {
      this.highlightError(error, i);
      i++;
    });
  };

  animateLabels = () => {
    const highlightedTextLabel = document.querySelector(
      "#highlightedTextLabel"
    );
    const correctedTextLabel = document.querySelector("#correctedTextLabel");
    const keyframes = [
      { transform: "translateY(0px) translateX(0px) scale(1)" },
      { transform: "translateY(-30px) translateX(-40px) scale(0.82)" },
    ];
    const timing = {
      duration: 300,
      iterations: 1,
      fill: "forwards",
    };
    correctedTextLabel.animate(keyframes, timing);
    highlightedTextLabel.animate(keyframes, timing);
  };

  handleMessages = () => {
    const highlightedtext = document.querySelector("#highlighted");
    const highlightedElems = highlightedtext.querySelectorAll("[id]");
    this.state.errors.length > 0 &&
      highlightedElems.forEach((elem) =>
        this.state.errors.forEach((error) => {
          if (error.replacements.length > 0 && error.id == elem.id) {
            const tooltipDiv = document.createElement("div");
            const toolTipP = document.createElement("p");
            tooltipDiv.className = "tooltip";
            tooltipDiv.appendChild(
              toolTipP
            ).textContent = error.replacements.join(", ");
            elem.parentNode.insertBefore(tooltipDiv, elem.nextSibling);
          }
        })
      );

    highlightedElems.length > 0 &&
      highlightedElems.forEach(
        (item) => (
          item.addEventListener("mouseover", (e) => this.animateAlert(e)),
          item.addEventListener("mouseout", (e) => this.stopAnimateAlert(e))
        )
      );
  }

  // ALERT ANIMATIONS
  animateAlert(e) {
    const currentError = this.state.errors.find((error) => {
      return error.id == e.target.id;
    });

    this.setState({
      isAlertActive: true,
      currentlyDisplayedError: currentError,
    });
  }

  stopAnimateAlert(e) {
    this.setState({
      isAlertActive: false,
      currentlyDisplayedError: {},
    });
  }
// SWITCH show/hide errors
  handleSwitch = () => {
    this.setState((prevState) => ({
      inParam: !prevState.inParam,
    }));
      const errors = document.querySelector('.grid-container-highlighted')
      const currentinParam = this.state.inParam
      if(currentinParam == false) {errors.classList.remove('hide')}
      else {errors.classList.add('hide')}
  };

  render() {
    return (
      <Container maxWidth='xl' className='main-container modal-main-container'>
        <Grid
          container
          spacing={4}
          justify='center'
          className='modal-header-container'
         >
            <Typography className='modal-header'>
              <h2>
                Korektor <br/> tekstu 
              </h2>
              <br></br>
              <p>Narzędzie umożliwia sprawdzenie pisowni w języku polskim</p>
            </Typography>
        </Grid>

        <Grid container spacing={4} justify='center' className='grid-container'>
          <form className='main-form'>
            <TextField
              className='start-text'
              multiline
              rows={2}
              onChange={this.handleChange}
              id='outlined-basic'
              label='Tekst do korekty'
              variant='outlined'
              value={this.state.text}
            />

            <Button
              className='button-send'
              variant="outlined"
              color='primary'
              onClick={this.handleSend}>
              {" "}
              Sprawdź{" "}
            </Button>
          </form>

          <EndText
            correctedText={this.state.correctedText}
            errors={this.state.errors}
            handleCopy={this.props.handleCopy}
            >
          </EndText>

          <FormControlLabel
            control={
              <Switch
                checked={this.state.inParam}
                onChange={this.handleSwitch}
                className = "show-errors-switch"
              />
            }
            label='Pokaż błędy'
          />
        </Grid>

        <Grow in={this.state.inParam}>
          <Grid
            container
            spacing={10}
            justify='center'
            className='grid-container-highlighted hide'>
            <HighlightedText
              originalHighlightedText={this.state.originalHighlightedText}></HighlightedText>
            <div className='alerts'>
              <Grow in={this.state.isAlertActive}>
                <Alert
                  severity='error'
                  className='alert'
                  id={`alert-${this.state.currentlyDisplayedError.id}`}>
                  <strong>pozycja błędu:</strong>{" "}
                  {this.state.currentlyDisplayedError.offset},{" "}
                  <strong>dlugość:</strong>{" "}
                  {this.state.currentlyDisplayedError.errorLength},
                  <strong> wiadomość:</strong>{" "}
                  {this.state.currentlyDisplayedError.message}
                </Alert>
              </Grow>
            </div>
          </Grid>
        </Grow>
      </Container>
    );
  }
}

export default SpellChecker;
