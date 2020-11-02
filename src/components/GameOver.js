import React from "react";

export default function GameOver(props) {
  // contents to show show after find button pressed
  const { status, time } = props.store;

  const planet_name =
    status == "success" ? (
      <p>Planet found : {props.store.planet_name}</p>
    ) : null;

  return (
    <div>
      <center>
        <p>
          {status == "success"
            ? "Success! Congratulation Mission complete"
            : "Oops! Better Luck Next Time"}
        </p>
        <p>Time taken : {time}</p>
        {status == "success" ? planet_name : null}
        <p>
          <button
            className="btn badge badge-pill badge-primary "
            onClick={props.reset}
          >
            Play Again
          </button>
          <br />
        </p>
      </center>
    </div>
  );
}
