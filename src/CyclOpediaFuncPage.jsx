import React, { useEffect, useState } from "react";
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

  // componentDidUpdate = async (previousProps, previousState) => {
  //   console.log("component did update");
  //   localStorage.setItem("cyclopediaState", JSON.stringify(this.state));

  //   if (previousState.studentCount < this.state.studentCount) {
  //     const response = await getRandomUser();
  //     this.setState((prevState) => {
  //       return {
  //         studentList: [
  //           ...prevState.studentList,
  //           { name: response.data.first_name + " " + response.data.last_name },
  //         ],
  //       };
  //     });
  //   } else if (previousState.studentCount > this.state.studentCount) {
  //     this.setState((prevState) => {
  //       return {
  //         studentList: [],
  //       };
  //     });
  //   }
  // };

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

    if (state.studentList.length < state.studentCount) {
      getUser();
    } else if (state.studentList.length > state.studentCount) {
      setState((previousState) => {
        return { ...previousState, studentList: [] };
      });
    }
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
        ></input>{" "}
        Value: {inputName}
        <br />
        <textarea
          placeholder="Feedback..."
          value={inputFeedback}
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
        ></textarea>{" "}
        Value: {inputFeedback}
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
