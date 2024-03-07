import React from "react";

class InstructorFunc extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Mount - instructor");
  }

  componentDidUpdate() {
    console.log("Update - instructor");
  }

  componentWillUnmount() {
    console.log("Unmount - instructor");
  }

  render() {
    console.log("Render - instructor");
    return (
      <div>
        <br />
        Name: {this.props.instructor.name} <br />
        Email: {this.props.instructor.email} <br />
        Phone: {this.props.instructor.phone} <br />
      </div>
    );
  }
}

export default InstructorFunc;
