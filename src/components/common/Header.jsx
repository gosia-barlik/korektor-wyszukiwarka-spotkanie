import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { Container, Grid } from "@material-ui/core";

export class Header extends Component {
  render() {
    return (
      <AppBar className='app-bar'>
        <Container maxWidth='xl'>
        <Grid
            container
            spacing={4}
            justify='center'
            className='grid-container-header'>
          <div className='App-title'>
          <Link to='/'
          className="search-app-logo">
            <h2>
              {" "}
              Wyszukiwarka <br /> umiejętności{" "}
            </h2>
            </Link>
            <p>Narzędzie umożliwia wyszukanie umiejętności ESCO na podstawie opisów efektów uczenia się</p>
          </div>
          </Grid>
        </Container>
      </AppBar>
    );
  }
}
