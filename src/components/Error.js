import React from "react";

export default function Error(props) {
  return (
    <div>
      <center>
        <h1>Error :( </h1>
        <p>{props.message}</p>
      </center>
    </div>
  );
}
