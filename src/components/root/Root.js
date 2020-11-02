import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reset } from "../actions/actionCreator";
import Error from "../Error";
import Footer from "../footer/Footer";
import GameOver from "../GameOver";
import Header from "../header/Header";
import Home from "../home/Home";
import Loading from "../Loading";

function Root(props) {
  const [id, setId] = useState(0);

  const reset = () => {
    props.reset();
    setId((prevState) => prevState + 1);
  };

  useEffect(() => {
    const { reset } = props;
    reset();
  }, []);

  const isgameOver = () => {
    if (props.store.status == "success" || props.store.status == "false") {
      return true;
    }
    return false;
  };

  const isLoading = () => {
    const { status } = props.store;
    return status == "Loading" || status == "Searching";
  };

  const isError = () => {
    console.error(props.store.error);
    return props.store.error.trim().length > 0;
  };

  return (
    <div>
      <Header reset={reset} />
      <div className="container-fluid">
        <center>
          <h1 className="my-3">Finding Falcone!</h1>
        </center>
        {isLoading() ? <Loading message={props.store.status} /> : null}
        {isgameOver() ? <GameOver reset={reset} store={props.store} /> : null}
        {isError() ? <Error message={props.store.error} /> : null}
        {!isgameOver() && !isError() && !isLoading() ? <Home key={id} /> : null}
      </div>
      <Footer fixed="bottom" />
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
    reset: () => dispatch(reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
