import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useVisualMode from "../hooks/useVisualMode"

import "components/Application.scss";

export default function Application(props) {
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("id, interview", id, interview);
    setState({...state, appointments }); // probably need to move this until after completing the put request, which means the transition(SHOW) after this function call in index.js needs to wait for a promise to complete --> need mentor help on this - Saturday.
      axios.put(`/api/appointments/${id}`, {interview: interview })
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        // return false;
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    axios.delete(`/api/appointments/${id}`, { interview: null })
    .then(function (response) {
      console.log(response);
      setState({...state, appointments }); // probably need to move this
    })
    .catch(function (error) {
      console.log(error);
      // return false;
    });
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState( prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
    }, []); 

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((current) => {
    // console.log("state= ", state);
    // console.log("current.interview=", current.interview)
    const interview = getInterview(state, current.interview);
    // console.log("current.id=", current.id);
    // console.log("current.time=", current.time)
    // console.log("interview=", interview)
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
