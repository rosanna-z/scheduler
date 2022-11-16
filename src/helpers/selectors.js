// Gets the appointments for the day from the database
export function getAppointmentsForDay(state, day) {
  let foundDay;
  const results = [];

  for (let singularDay of state.days) {
    if (singularDay.name === day) {
      foundDay = singularDay;
    }
  }
  if (!foundDay || foundDay.length < 1) {
    return [];
  }

  for (let appointmentId of foundDay.appointments) {
    results.push(state.appointments[appointmentId]);
  }
  return results;

  // equivalent code:
  // const foundDay = state.days.find(dayObj => dayObj.name === day)
  // if (!foundDay) return [];
  // return foundDay.appointments.map(appointmentId => state.appointments[appointmentId])
}

// Creates an interview object (for the Appointment component)
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

// Gets the interiewers for the day from the database
export function getInterviewersForDay(state, day) {
  let interviewersArr = [];
  
  const foundDay = state.days.find(dayObj => dayObj.name === day)

  if (!foundDay || foundDay.length < 1) {
    return interviewersArr;
  }

  for (const interviewerId of foundDay.interviewers) {
    interviewersArr.push(state.interviewers[interviewerId])
  }
  return interviewersArr;
}
