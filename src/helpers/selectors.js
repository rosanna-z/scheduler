export function getAppointmentsForDay(state, day) {
  let foundDay;
  const results = [];

  for (let singularDay of state.days) {
    if (singularDay.name === day) {
      foundDay = singularDay;
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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return interviewObj;
}
