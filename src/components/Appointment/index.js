import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  function cancel(id) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={cancel}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message="Error saving appointment" />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message="Error deleting appointment" />
      )}
    </article>
  );
}
