import React, { useState } from "react";
import "./Vehicle.css";

export default function Vehicle(props) {
  const [selectedVehicle, setSelectedVehicle] = useState(-1);

  const changeHandler = (event) => {
    const currentVehicle = parseInt(event.target.value);
    props.updateVehicle(currentVehicle);
    setSelectedVehicle(currentVehicle);
  };

  const vehicles = props.vehicles
    ? props.vehicles.map((vehicle, index) => {
        const name = "vehicle" + props.id;
        const val = "" + index;
        let className = "radio left";
        let disabled = false;
        if (
          (vehicle.total_no == 0 || props.distance > vehicle.max_distance) &&
          selectedVehicle != index
        ) {
          className = className + " disabled";
          disabled = true;
        }
        return (
          <div key={index} className={className}>
            <label htmlFor={vehicle.name}>
              <input
                type="radio"
                name={name}
                value={val}
                onChange={changeHandler}
                disabled={disabled}
              />
              {vehicle.name} ({vehicle.total_no})
            </label>
            <br />
          </div>
        );
      })
    : null;

  return <div>{vehicles}</div>;
}
