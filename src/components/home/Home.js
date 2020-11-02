import React from "react";
import { connect } from "react-redux";
import { findfalcone } from "../actions/actionCreator";
import Planet from "../planet/Planet";
import { find_url, token_url } from "../Production";
import "./Home.css";

const MAX_PLANETS = 4;

function Home({ store, findfalcone }) {
  const Planets_Selected = () => {
    // to active and disable find button
    let count = 0;
    store.vehicles.forEach((vehicle) => {
      // if  vehicle is selected than planet must be selected
      count = count + vehicle.selected;
    });
    return count == MAX_PLANETS;
  };

  const findFalconeFn = () => {
    let planet_names = [];
    let vehicle_names = [];
    store.planets.forEach((planet) => {
      if (planet.selected) {
        planet_names.push(planet.name);
      }
    });
    store.vehicles.forEach((vehicle) => {
      if (vehicle.selected > 0) {
        let count = vehicle.selected;
        while (count > 0) {
          vehicle_names.push(vehicle.name);
          count--;
        }
      }
    });
    const body = {
      token: "",
      planet_names: planet_names,
      vehicle_names: vehicle_names,
    };
    findfalcone(token_url, find_url, body);
  };
  let planets = [];

  for (let id = 1; id <= MAX_PLANETS; id++) {
    const key = id;

    planets.push(
      <div className="w-20" key={key}>
        <b className="text_bold">Destination {id}</b>
        <Planet id={key} />
      </div>
    );
  }
  return (
    <div className="container">
      <center>
        <h3 className="py-5">Select planets you want to search in</h3>
      </center>
      <div className="row">
        {planets}
        <div className="w-20">
          <b className="text_bold stick_right">Time taken</b>
          <br />
          <span className="badge badge-lg badge-pill badge-secondary btn stick_right">
            {store.time}
          </span>
        </div>
      </div>
      <center className="my-5">
        <button
          className="btn btn-outline-dark"
          onClick={findFalconeFn}
          disabled={Planets_Selected() ? false : true}
        >
          Find
        </button>
        <br />
      </center>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    store: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findfalcone: (token_url, find_url, data) => {
      dispatch(findfalcone(token_url, find_url, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
