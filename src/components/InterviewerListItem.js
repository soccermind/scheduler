import React from "react";
import classNames from 'classnames';

import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewersClass = classNames(
    'interviewers__item', 
      {
      'interviewers__item--selected': props.selected
      }
    );
  let interviewersClassImage = classNames(
    'interviewers__item-image', 
      {
      'interviewers__item--selected-image': props.selected
      }
    );

  return (
    <li className={interviewersClass} onClick={props.setInterviewer}>
      <img
        className={interviewersClassImage}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}