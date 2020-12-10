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