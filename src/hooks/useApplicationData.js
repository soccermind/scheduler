import { useState, useEffect } from "react";
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
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
    }, []);

  // Function called from save() when Creating or Editing an interview
  function bookInterview(id, interview, transition, _mode, _errorMode, originMode) {
    const days = [...state.days];
    if (originMode === 'CREATE') {
      const dayIndex = state.days.findIndex( _day => _day.name === state.day);
      const newSpots = state.days[dayIndex].spots - 1;
      const selectedDay = {
        ...state.days[dayIndex], spots: newSpots
      }
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
    axios.put(`/api/appointments/${id}`, {interview: interview })
    .then(function (response) {
      setState(prev => ({...prev, appointments, days }));
      
      transition(_mode);
    })
    .catch(function (error) {
      transition(_errorMode, true);
    });
  }

  // function called from deleteInt() when deleting an interview
  function cancelInterview(id, transition, _mode, _errorMode) {
    const dayIndex = state.days.findIndex( _day => _day.name === state.day);
    const newSpots = state.days[dayIndex].spots + 1;
    const selectedDay = {
      ...state.days[dayIndex], spots: newSpots
    }
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
    
    axios.delete(`/api/appointments/${id}`, { interview: null })
    .then(function (response) {
      setState(prev => ({...prev, appointments, days }));
      transition(_mode);
    })
    .catch(function (error) {
      transition(_errorMode, true);
    });
  }

  return { state, setDay, bookInterview, cancelInterview }
}