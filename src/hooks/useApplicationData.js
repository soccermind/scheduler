import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState( prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
    }, []);

  // Function called from save() when Creating or Editing an interview
  function bookInterview(id, interview, transition, _mode, _errorMode, originMode) {
    const days = [...state.days];
    if (originMode === 'CREATE') {
      const dayIndex = state.days.findIndex( _day => _day.name === state.day);
      console.log("dayIndex=", dayIndex);
      const newSpots = state.days[dayIndex].spots - 1;
      // const currentSpots = state.days.find( _day => _day.name === state.day).spots;
      // console.log("currentSpots=", currentSpots)
      console.log("state.days[dayIndex].spots", state.days[dayIndex].spots)
      console.log("newSpots=", newSpots)
      const selectedDay = {
        ...state.days[dayIndex], spots: newSpots
      }
      console.log("selectedDay=", selectedDay)
      // const days = [...state.days];
      days[dayIndex] = selectedDay;
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log("id, interview", id, interview);
      // Tried to use useEffect here but can't Error: React Hook "useEffect" is called in function "bookInterview" which is neither a React function component or a custom React Hook function 
    axios.put(`/api/appointments/${id}`, {interview: interview })
    .then(function (response) {
      console.log(response);
      // setState({...state, appointments });
      setState(prev => ({...prev, appointments, days }));
      
      transition(_mode);
    })
    .catch(function (error) {
      console.log(error);
      transition(_errorMode, true);
      // return false;
    });
  }

  // function called from deleteInt() when deleting an interview
  function cancelInterview(id, transition, _mode, _errorMode) {
    const dayIndex = state.days.findIndex( _day => _day.name === state.day);
    console.log("dayIndex=", dayIndex);
    const newSpots = state.days[dayIndex].spots + 1;
    // const currentSpots = state.days.find( _day => _day.name === state.day).spots;
    // console.log("currentSpots=", currentSpots)
    console.log("state.days[dayIndex].spots", state.days[dayIndex].spots)
    console.log("newSpots=", newSpots)
    const selectedDay = {
      ...state.days[dayIndex], spots: newSpots
    }
    console.log("selectedDay=", selectedDay)
    const days = [...state.days];
    days[dayIndex] = selectedDay;

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
  // Tried to put useEffect here but can't Error: React Hook "useEffect" is called in function "cancelInterview" which is neither a React function component or a custom React Hook function 
    axios.delete(`/api/appointments/${id}`, { interview: null })
    .then(function (response) {
      console.log(response);
      // setState({...state, appointments });
      setState(prev => ({...prev, appointments, days }));
      transition(_mode);
    })
    .catch(function (error) {
      console.log(error);
      transition(_errorMode, true);
      // return false;
    });

  }


  return { state, setDay, bookInterview, cancelInterview }
}