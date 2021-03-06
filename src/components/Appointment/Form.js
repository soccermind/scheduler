import React, { useState } from "react";

import Button from "../Button";
import InterviewerList from "../InterviewerList";


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [id, setId] = useState(props.interviewer ? props.interviewer.id : null);
  const [error, setError] = useState("");

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (id === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(name, id);
  }

  const onSave = event => {
    validate();
  };
  const reset = () => {
    setName("");
    setId(null);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers} 
          id={id}
          setInterviewer={setId} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}