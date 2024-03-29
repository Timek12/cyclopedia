import React, { useEffect, useState, useRef, useId } from "react";
import { getRandomUser } from "./Utility/api";
import InstructorFunc from "./InstructorFunc";

const CycloFuncPediaPage = () => {
  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });

  const [inputName, setInputName] = useState(() => {
    return "";
  });
  const [inputFeedback, setInputFeedback] = useState(() => {
    return "";
  });

  const totalRender = useRef(0);
  const previousStudentCount = useRef(0);
  const feedbackInputRef = useRef(null);
  const id = useId();

  useEffect(() => {
    totalRender.current = totalRender.current + 1;
    console.log("render: " + totalRender.current);
  });

  useEffect(() => {
    feedbackInputRef.current.focus();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };

    if (!state.hideInstructor) {
      getUser();
    }
  }, [state.hideInstructor]);

  useEffect(() => {
    const getUser = async () => {
      const response = await getRandomUser();
      setState((previousState) => {
        return {
          ...previousState,
          studentList: [
            ...previousState.studentList,
            { name: response.data.first_name + " " + response.data.last_name },
          ],
        };
      });
    };

    if (previousStudentCount.current < state.studentCount) {
      getUser();
    } else if (previousStudentCount.current > state.studentCount) {
      setState((previousState) => {
        return { ...previousState, studentList: [] };
      });
    }
  }, [state.studentCount]);

  useEffect(() => {
    previousStudentCount.current = state.studentCount;
  }, [state.studentCount]);

  const handleAddStudent = () => {
    setState((previousState) => {
      return {
        ...previousState,
        studentCount: previousState.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudents = () => {
    setState((previousState) => {
      return {
        ...previousState,
        studentCount: 0,
      };
    });
  };

  const handleToggleInstructor = () => {
    setState((previousState) => {
      return {
        ...previousState,
        hideInstructor: !previousState.hideInstructor,
      };
    });
  };

  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success">Instructor</span>
        <i
          className={`bi bi-toggle-${
            state.hideInstructor ? "off" : "on"
          } btn btn-success btn-sm`}
          onClick={handleToggleInstructor}
        ></i>
        {!state.hideInstructor && state.instructor ? (
          <InstructorFunc instructor={state.instructor} />
        ) : null}
      </div>
      <div className="p-3">Total Render: {totalRender.current}</div>
      <div className="p-3">
        <span className="h4 text-success">Feedback</span>
        <br />
        <input
          type="text"
          placeholder="Name..."
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
          }}
          id={`${id}inputName`}
        ></input>{" "}
        <label htmlFor={`${id}inputName`}>Name Value:</label> {inputName}
        <br />
        <textarea
          placeholder="Feedback..."
          value={inputFeedback}
          ref={feedbackInputRef}
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
          id={`${id}inputFeedback`}
        ></textarea>{" "}
        <label htmlFor={`${id}inputFeedback`}>Feedback Value:</label> {inputFeedback}
      </div>
      <div className="p-3">
        <span className="h4 text-success">Students</span> <br />
        <div>Student Count : {state.studentCount} </div>
        <button className="btn btn-success btn-sm" onClick={handleAddStudent}>
          Add Student
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          onClick={handleRemoveAllStudents}
        >
          Remove All Students
        </button>
        {state.studentList.map((student, index) => {
          return (
            <div className="text-white" key={index}>
              - {student.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CycloFuncPediaPage;
