import React, { Fragment } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";

import useVisualMode from "../../hooks/useVisualMode"

import "./styles.scss";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    const originMode = mode;
    transition(SAVING);
    props.bookInterview(props.id, interview, transition, SHOW, ERROR_SAVE, originMode);
} 

  function deleteInt(id) { 
    transition(DELETING, true);
    props.cancelInterview(props.id, transition, EMPTY, ERROR_DELETE);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Fragment>
      <Header time={props.time} />
      { mode === SHOW && (
        <Show 
          student={props.interview.student} 
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        /> 
      )}
      { mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={deleteInt}
          onCancel={() => back()}
        />

      )}
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      { mode === EDIT && (
        <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        />
      )}
      { mode === SAVING && <Status message={"Saving"} />}
      { mode === DELETING && <Status message={"Deleting"} />}
      { mode === ERROR_SAVE && (
        <Error 
          message={"Could not save the appointment"}
          onClose={() => back()} 
        />
      )}
      { mode === ERROR_DELETE && (
        <Error 
          message={"Could not delete the appointment"}
          onClose={() => back()} 
        />
      )}
      </Fragment>
    </article>
  );
}