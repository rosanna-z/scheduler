export function getAppointmentsForDay(state, day) {
  let foundDay;
  const results = [];

  for (let element of state.days) {
    if (element.name === day) {
      foundDay = element;
    }
  }
  if (!foundDay) {
    return [];
  }

  for (let appointmentId of foundDay.appointments) {
    results.push(state.appointments[appointmentId]);
  }
  return results;

  // equivalent code:
  // const foundDay = state.days.find(d => d.name === day)
  // if (!foundDay) return [];
  // return foundDay.appointments.map(appointmentId => state.appointments[appointmentId])
}
