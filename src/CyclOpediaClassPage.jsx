import React from "react";
import { getRandomUser } from "./Utility/api";

export default class CycloPediaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  }

  componentDidMount = async () => {
    console.log("component did mount");
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
  };

  componentDidUpdate() {
    console.log("component did update");
  }

  componentWillUnmount() {
    console.log("component will unmount");
  }

  render() {
    console.log("render component");
    return (
      <div>
        {this.state.instructor != undefined && (
          <div className="p-3">
            <span className="h4 text-success">Instructor</span>
            <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
            <br />
            Name: {this.state.instructor.name} <br />
            Email: {this.state.instructor.email} <br />
            Phone: {this.state.instructor.phone} <br />
          </div>
        )}
      </div>
    );
  }
}
