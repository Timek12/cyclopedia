import React, { useEffect } from "react";

const InstructorFunc = (props) => {
  return (
    <div>
      <br />
      Name: {props.instructor.name} <br />
      Email: {props.instructor.email} <br />
      Phone: {props.instructor.phone} <br />
    </div>
  );
};

export default InstructorFunc;
