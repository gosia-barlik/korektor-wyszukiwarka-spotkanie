import React, { Component } from "react";
import { Typography, Button, Grid, Grow } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";

export class Characteristics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid
        container
        spacing={4}
        justify='center'
        className='search-grid-container'>
        <Paper component='form' className='search-title-wrapper'>
          <Typography className='search-title'>
           Charakterystyka - korektor, dłuższe pole
          </Typography>
          <div className='check-spelling'>
            <Grow
              in={this.props.isCheckSpellingButtonActive}
              style={{ transformOrigin: "0 0 0" }}
              timeout={600}>
              <Button
                color='inherit'
                className='menu-button check-spelling-button'
                onClick={this.props.handleClick}>
                <a>sprawdź pisownię</a>
              </Button>
            </Grow>
          </div>
        </Paper>
        <Paper component='form' className='searchbar-wrapper'>
          <InputBase
            placeholder="Search…"
            className='input-searchfield input-textfield'
            inputProps={{ "aria-label": "search" }}
            onChange={this.props.handleChange}
            type='search'
            value={this.props.text}
          />
          <IconButton
            type='submit'
            onClick={this.props.handleSearch}
            aria-label='search'>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
    );
  }
}