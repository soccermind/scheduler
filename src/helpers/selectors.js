import React from 'react';

export default function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const dayObj = state.days.filter(elem => elem.name === day)[0];
  if (!dayObj || Object.keys(dayObj).length === 0) {
    return [];
  }
  const appointmentArr = dayObj.appointments;
  let result = [];
  
  result = appointmentArr.map(id => state.appointments[id]);
  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  let interviewObj = {};
  interviewObj["student"] = interview.student;
  interviewObj["interviewer"] = {};
  interviewObj["interviewer"]["id"] = interview.interviewer;
  // console.log("*******state.interviewers=", state.interviewers)
  // console.log("*******interview.interviewer", interview.interviewer)
  interviewObj["interviewer"]["name"] = state.interviewers[interview.interviewer].name;
  interviewObj["interviewer"]["avatar"] = state.interviewers[interview.interviewer].avatar;
  console.log("***interviweObj=", interviewObj)
  return interviewObj; 
 
}