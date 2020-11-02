import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addQuantity, subQuantity, updateTime } from "../actions/actionCreator";
import Vehicle from "../vehicle/Vehicle";
import "./Planet.css";

const MAX_VEHICLES = 4;

function Planet(props) {
  const [id, setId] = useState(0);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState(-1);
  const [selectedVehicle, setSelectedVehicle] = useState(-1);

  useEffect(() => {
    setId(props.id);
  }, []);

  const updateVehicle = (currentVehicle) => {
    const time =
      currentVehicle !== -1 ? distance / props.vehicles[currentVehicle].speed : 0;
    // const prev_vehicle = selected_vehicle;
    const prev_vehicle = selectedVehicle;
    if (prev_vehicle !== -1) {
      props.addQuantity(prev_vehicle, "vehicle");
      props.updateTime(-time);
    }
    if (currentVehicle !== -1) {
      props.subQuantity(currentVehicle, "vehicle");
      props.updateTime(time);
    }

    setSelectedVehicle(currentVehicle);
    setTime(time);
  };

  const changeHandler = (event) => {
    const cur_planet = parseInt(event.target.value);
    const distance = cur_planet !== -1 ? props.planets[cur_planet].distance : 0;
    const prev_planet = selectedPlanet;
    if (prev_planet !== -1) {
      props.addQuantity(prev_planet, "planet");
    }
    if (cur_planet !== -1) {
      props.subQuantity(cur_planet, "planet");
    }
    props.addQuantity(selectedVehicle, "vehicle");
    props.updateTime(-time);
    setId((prevState) => prevState.id + MAX_VEHICLES);
    setSelectedVehicle(-1);
    setTime(0);
    setSelectedPlanet(cur_planet);
    setDistance(distance);
  };

  const planets = props.planets
    ? props.planets.map((planet, index) => {
        let id = "" + index;
        if (!planet.selected || selectedPlanet == id) {
          return (
            <option key={id} value={id}>
              {planet.name}{" "}
            </option>
          );
        }
      })
    : null;

  return (
    <div>
      <select onChange={changeHandler} value={"" + selectedPlanet}>
        <option value="-1">Select</option>
        {planets}
      </select>
      {selectedPlanet !== -1 ? (
        <Vehicle
          id={id}
          key={id}
          vehicles={props.vehicles}
          updateVehicle={updateVehicle}
          distance={distance}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    vehicles: state.vehicles,
    planets: state.planets,
    id: ownProps.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (index, type) => {
      dispatch(addQuantity(index, type));
    },
    subQuantity: (index, type) => {
      dispatch(subQuantity(index, type));
    },
    updateTime: (val) => {
      dispatch(updateTime(val));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Planet);
