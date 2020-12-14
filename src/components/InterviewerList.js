import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

function InterviewerList(props) {
  const parsedInterviewerList = props.interviewers && props.interviewers.map(interviewer => 
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name} 
      avatar={interviewer.avatar}
      selected={interviewer.id === props.id} // adding .id breaks functionality.
      setInterviewer={event => props.setInterviewer(interviewer.id)} 
    />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewerList && parsedInterviewerList.length ? parsedInterviewerList : "This list is empty"}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;