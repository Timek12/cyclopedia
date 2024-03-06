import React from "react";
import { getRandomUser } from "./Utility/api";
import Instructor from "./Instructor";

export default class CycloPediaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  }

  componentDidMount = async () => {
    console.log("component did mount");
    if (JSON.parse(localStorage.getItem("cyclopediaState"))) {
      this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
    } else {
      const response = await getRandomUser();
      console.log(response);
      this.setState((previousState) => {
        return {
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    }
  };

  componentDidUpdate() {
    console.log("component did update");
    localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    console.log("component will unmount");
  }

  handleAddStudent = () => {
    this.setState((previousState) => {
      return {
        studentCount: previousState.studentCount + 1,
      };
    });
  };

  handleRemoveAllStudents = () => {
    this.setState((previousState) => {
      return {
        studentCount: 0,
      };
    });
  };

  handleToggleInstructor = () => {
    this.setState((previousState) => {
      return {
        hideInstructor: !previousState.hideInstructor,
      }
    })
  }

  render() {
    console.log("render component");
    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success">Instructor</span>
          <i className={`bi bi-toggle-${this.state.hideInstructor ? "off" : "on"} btn btn-success btn-sm`}
          onClick={this.handleToggleInstructor}></i>
          {!this.state.hideInstructor ? (
            <Instructor instructor={this.state.instructor} />
          ) : null}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Feedback</span>
          <br />
          <input
            type="text"
            placeholder="Name..."
            value={this.state.inputName}
            onChange={(e) => {
              this.setState({ inputName: e.target.value });
            }}
          ></input>
          <br />
          <textarea
            placeholder="Feedback..."
            value={this.state.inputFeedback}
            onChange={(e) => {
              this.setState({ inputFeedback: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="p-3">
          <span className="h4 text-success">Students</span> <br />
          <div>Student Count : {this.state.studentCount} </div>
          <button
            className="btn btn-success btn-sm"
            onClick={this.handleAddStudent}
          >
            Add Student
          </button>
          &nbsp;
          <button
            className="btn btn-danger btn-sm"
            onClick={this.handleRemoveAllStudents}
          >
            Remove All Students
          </button>
        </div>
      </div>
    );
  }
}
