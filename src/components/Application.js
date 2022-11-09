import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  
  function bookInterview(id, interview) {
    // replace current value of interview key with new value
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // replace existing record with matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("id===>", id, "interview", interview);
    // makes a request to API to update with new interview
    return axios
    .put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      setState({
        ...state,
        appointments,
      });
    })
    .catch((err) => console.log(err));
  }

  function cancelInterview(id) {
    // set current value of interview key to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    // replace existing record with matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // make API request to delete appointment 
    return axios
    .delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({
        ...state, 
        appointments,
      })
    })
    .catch((err) => console.log(err));
  };
  
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      // console.log(all[0].data, all[1].data, all[2].data);
    });
  }, []);

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{" "}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
