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

export const changeQualificationInput = (inputValue) => {
  return { type: CHANGE_QUALIFICATION_INPUT, payload: inputValue };
};

export const changeSearchInput = (inputValue) => {
  return { type: CHANGE_SEARCH_INPUT, payload: inputValue };
};
export const showCheckSpelling = () => {
  return { type: SHOW_CHECKSPELLING_DIALOG };
};
export const searchSkill = (foundSkills) => {
  return { type: SEARCH_SKILL, payload: foundSkills};
};
export const hideCheckSpelling = () => {
  return { type: HIDE_CHECKSPELLING_DIALOG };
};
export const copyCorrectedTextQualification = (correctedText) => {
  return { type: COPY_CORRECTED_TEXT_QUALIFICATION, payload: correctedText};
};
export const copyCorrectedTextCharasteristics = (correctedText) => {
  return { type: COPY_CORRECTED_TEXT_CHARACTERISTICS, payload: correctedText};
};
export const copyCorrectedTextSkills = (correctedText) => {
  return { type: COPY_CORRECTED_TEXT_SKILLS, payload: correctedText};
};




