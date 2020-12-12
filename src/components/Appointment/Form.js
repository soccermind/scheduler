import React, { useState } from "react";

import Button from "../Button";
import InterviewerList from "../InterviewerList";


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  // const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [id, setId] = useState(props.interviewer ? props.interviewer.id : null);
  // console.log("**Interviewer=", interviewer)
  const onSave = event => {
  //  debugger
    props.onSave(name, id); // interviewers
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
            /*
              This must be a controlled component
            */
          />
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