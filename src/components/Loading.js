import React from "react";

export default function Loading(props) {
  return (
    <div>
      <center>
        <h3>{props.message}...</h3>
      </center>
    </div>
  );
}
