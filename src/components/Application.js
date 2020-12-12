import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useVisualMode from "../hooks/useVisualMode"
import useApplicationData from "../hooks/useApplicationData"

import "components/Application.scss";

export default function Application(props) {
  // AFTER MOVING CODE TO useApplicationData.js
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // ^

  // move to useApplicationData.js
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });
  // move to useApplicationData.js
  // const setDay = day => setState( prev => ({ ...prev, day }));
  // // move to useApplicationData.js
  // useEffect(() => {
  //   Promise.all([
  //     axios.get("http://localhost:8001/api/days"),
  //     axios.get("http://localhost:8001/api/appointments"),
  //     axios.get("http://localhost:8001/api/interviewers")
  //   ]).then((all) => {
  //       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  //     });
  //   }, []); 

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((current) => {
    const interview = getInterview(state, current.interview);
    return (
      <Appointment 
        key={current.id} 
        id={current.id}
        time={current.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // move to useApplicationData.js
  // Function called from save() when Creating or Editing an interview
  // function bookInterview(id, interview, transition, _mode, _errorMode) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   // console.log("id, interview", id, interview);
  //     // Tried to use useEffect here but can't Error: React Hook "useEffect" is called in function "bookInterview" which is neither a React function component or a custom React Hook function 
  //   axios.put(`/api/appointments/${id}`, {interview: interview })
  //   .then(function (response) {
  //     console.log(response);
  //     setState({...state, appointments }); 
  //     transition(_mode);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     transition(_errorMode, true);
  //     // return false;
  //   });
  // }
  
  // move to useApplicationData.js
  // function called from deleteInt() when deleting an interview
  // function cancelInterview(id, transition, _mode, _errorMode) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //  // Tried to put useEffect here but can't Error: React Hook "useEffect" is called in function "cancelInterview" which is neither a React function component or a custom React Hook function 
  //   axios.delete(`/api/appointments/${id}`, { interview: null })
  //   .then(function (response) {
  //     console.log(response);
  //     setState({...state, appointments });
  //     transition(_mode);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     transition(_errorMode, true);
  //     // return false;
  //   });

  // }



  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
