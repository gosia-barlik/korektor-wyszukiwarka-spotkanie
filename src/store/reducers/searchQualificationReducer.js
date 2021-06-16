import {
    CHANGE_QUALIFICATION_INPUT,
    CHANGE_SEARCH_INPUT,
    SHOW_CHECKSPELLING_DIALOG,
    SEARCH_SKILL,
    HIDE_CHECKSPELLING_DIALOG,
    COPY_CORRECTED_TEXT_QUALIFICATION,
    COPY_CORRECTED_TEXT_CHARACTERISTICS,
    COPY_CORRECTED_TEXT_SKILLS
  } from "../consts";
  
  const initialState = {
    textQualification: " ",
    textCharasteristics: " ",
    textSkills: " ",
    text: " ",
    skills: [],
    isButtonQualificationActive: false,
    isButtonCharacteristicsActive: false,
    isButtonSkillsActive: false,
    isCheckSpellingAppActive: false,
  };

  const addId = (arr) => {
    let id = 100;
    return arr.map((item) => ({
      ...item,
      id: id++,
    }));
  };
  
  export const searchQualificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_QUALIFICATION_INPUT: {
        return {
          ...state,
          textQualification: action.payload,
          isButtonQualificationActive: true,
        };
      }
      case CHANGE_SEARCH_INPUT: {
        return {
          ...state,
          text: action.payload,
          isCheckSpellingButtonActive: true,
        };
      }
      case SHOW_CHECKSPELLING_DIALOG: {
        return {
          ...state,
          isCheckSpellingAppActive: true,
        };
      }
      case SEARCH_SKILL: {
        return {
          ...state,
          skills: addId(action.payload["Top n most similar ESCO skills"]),//TODO:: zmienić na backendzie na items
        };
      }
      case HIDE_CHECKSPELLING_DIALOG: {
        return {
          ...state,
          isCheckSpellingAppActive: false,
        };
      }
      case COPY_CORRECTED_TEXT_QUALIFICATION: {
        return {
          ...state,
          textQualification: action.payload,
        };
      }
      case COPY_CORRECTED_TEXT_CHARACTERISTICS: {
        return {
          ...state,
          textCharasteristics: action.payload,
        };
      }
      case COPY_CORRECTED_TEXT_SKILLS: {
        return {
          ...state,
          textSkills: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  };
  