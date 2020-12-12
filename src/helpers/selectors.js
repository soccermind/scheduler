function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  // const dayObj = state.days.filter(elem => elem.name === day)[0];
  const dayObj = state.days.find(currentDay => currentDay.name === day);
  // if (!dayObj || Object.keys(dayObj).length === 0) {
  if (!dayObj) {
    return [];
  }
  
  const appointmentArr = dayObj.appointments.map(appointmentId => state.appointments[appointmentId]);

  // const appointmentArr = dayObj.appointments;
  // let result = [];
  
  // result = appointmentArr.map(id => state.appointments[id]);
  return appointmentArr;
};

  function getInterview(state, interview) {
    if (!interview) {
      return null;
    }
    let interviewObj = { "student": "", "interviewer": { "id": null, "name": "", "avatar": null  }};
    interviewObj.student = interview.student;
    // interviewObj["interviewer"] = {};
    // if (!interview.interviewer) {
    //   return interviewObj;
    // }
    interviewObj["interviewer"]["id"] = interview.interviewer;
    // console.log("*******state.interviewers=", state.interviewers)
    // console.log("*******interview.interviewer", interview.interviewer)
    // debugger 
    interviewObj["interviewer"]["name"] = state.interviewers[interview.interviewer]["name"];
    
    interviewObj["interviewer"]["avatar"] = state.interviewers[interview.interviewer]["avatar"];
    // console.log("***interviweObj=", interviewObj)
    return interviewObj;
  }; 

  function getInterviewersForDay(state, day) {
    //... returns an array of appointments for that day
    // const dayObj = state.days.filter(elem => elem.name === day)[0];
    const dayObj = state.days.find(currentDay => currentDay.name === day);
    // if (!dayObj || Object.keys(dayObj).length === 0) {
    if (!dayObj) {
      return [];
    }
    
    const interviewerArr = dayObj.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  
    // const appointmentArr = dayObj.appointments;
    // let result = [];
    
    // result = appointmentArr.map(id => state.appointments[id]);
    return interviewerArr;
  };


export { getAppointmentsForDay, getInterview, getInterviewersForDay }