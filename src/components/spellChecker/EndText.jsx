import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

export class EndText extends Component {

  render() {
    return (
      <div className='end-text' onBlur={this.onChange}>
        <div className='end-text-item'>
          <div>
            <p id='correctedTextLabel'>Tekst poprawiony</p>
            <div className='corrected-text'>{this.props.correctedText}</div>
          </div>
        </div>
          <IconButton
            type='submit'
            onClick={() => (this.props.handleCopy(this.props.correctedText))}
            aria-label='search'
            id='icon-copy-spellcheckerapp'>
            <FileCopyOutlinedIcon />
          </IconButton>
      </div>
    );
  }
}
