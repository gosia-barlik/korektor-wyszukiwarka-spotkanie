import { Container, Grid } from "@material-ui/core";
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Fade from "@material-ui/core/Fade";
import { SpellChecker } from "../spellChecker/SpellChecker.jsx";
import { SearchSkill } from "./SearchSkill.jsx";
import { Qualification } from "./Qualification.jsx";
import { Characteristics } from "./Characteristics.jsx";
import { GrowAccordionElem } from "./GrowAccordionElem.jsx";
import Draggable from "react-draggable";
import config from "../../config";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQualificationInput,
  changeSearchInput,
  showCheckSpelling,
  searchSkill,
  hideCheckSpelling,
  copyCorrectedTextQualification,
  copyCorrectedTextCharasteristics,
  copyCorrectedTextSkills,
  copyCorrectedText
} from "../../store/actions/globalActions";

export default function MainForm() {

  const [localStateText, setText] = useState('');
  const [updateTextFunction, setUpdateTextFunction] = useState(()=>()=>{});

  const dispatch = useDispatch();
  const searchQualificationReducer = useSelector(
    (state) => state.searchQualificationReducer
  );

  const onchangeQualificationInput = (e) => {
    dispatch(changeQualificationInput(e.target.value));
  };

  const onchangeSearchInput = (e) => {
    dispatch(changeSearchInput(e.target.value));
  };
  


  const onShowCheckSpellingQualification = () => {
    setText(searchQualificationReducer.textQualification); 
    setUpdateTextFunction(()=>onCopyCorrectedTextQualification);
    dispatch(showCheckSpelling());
  };

  const onShowCheckSpellingCharasteristics = () => {
    setText(searchQualificationReducer.textCharasteristics); 
    setUpdateTextFunction(()=>onCopyCorrectedTextCharasteristics);
    dispatch(showCheckSpelling());
  };

  const onShowCheckSpellingSkills = () => {
    setText(searchQualificationReducer.textSkills); 
    setUpdateTextFunction(()=>onCopyCorrectedTextSkills);
    dispatch(showCheckSpelling());
  };
  
  
  
  const onhideCheckSpelling = () => {
    dispatch(hideCheckSpelling());
  };

  
  const onsearchSkill = (response) => {
    dispatch(searchSkill(response));
  };



  const onCopyCorrectedTextQualification = (correctedText) => {
    dispatch(copyCorrectedTextQualification(correctedText));
  };

  const onCopyCorrectedTextCharasteristics = (correctedText) => {
    dispatch(copyCorrectedTextCharasteristics(correctedText));
  };

  const onCopyCorrectedTextSkills = (correctedText) => {
    dispatch(copyCorrectedTextSkills(correctedText));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const url = `${config.BASE_URL}/findSimilar/`;
    fetch(url, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        text: searchQualificationReducer.textQualification,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return onsearchSkill(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container maxWidth='xl' className='main-container'>
      <Qualification
        handleSearch={handleSearch}
        handleClick={onShowCheckSpellingQualification}
        handleChange={onchangeQualificationInput}
        text={searchQualificationReducer.textQualification}
        isButtonQualificationActive={
          searchQualificationReducer.isButtonQualificationActive
        }
      />

      <Characteristics
        handleSearch={handleSearch}
        handleClick={onShowCheckSpellingCharasteristics}
        handleChange={onchangeSearchInput}
        text={searchQualificationReducer.textCharasteristics}
        isCheckSpellingButtonActive={
          searchQualificationReducer.isCheckSpellingButtonActive
        }
      />

      <SearchSkill
        handleSearch={handleSearch}
        handleClick={onShowCheckSpellingSkills}
        handleChange={onchangeSearchInput}
        text={searchQualificationReducer.textSkills}
        isCheckSpellingButtonActive={
          searchQualificationReducer.isCheckSpellingButtonActive
        }
      />

      <Grid
        container
        spacing={4}
        justify='center'
        className='grid-container-skills'>
        <Dialog
          className='modal'
          aria-labelledby='form-dialog-title'
          open={searchQualificationReducer.isCheckSpellingAppActive}
          onClose={onhideCheckSpelling}
          TransitionComponent={Draggable}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={searchQualificationReducer.isCheckSpellingAppActive}>
            <div className='fadein'>
              <IconButton
                edge='start'
                onClick={onhideCheckSpelling}
                id='icon-close-spellchecker'>
                <CloseIcon />
              </IconButton>
              <SpellChecker
                text={localStateText}
                handleCopy={updateTextFunction}
              />
            </div>
          </Fade>
        </Dialog>
        {searchQualificationReducer.skills.map((skill) => (
          <GrowAccordionElem skill={skill} />
        ))}
      </Grid>
    </Container>
  );
}
