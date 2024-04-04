import React, { Component } from "react";
import loading from "./loading.gif"
export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img className="my-3" src={loading} alt="loading" height="50px"width="px" />
      </div>
    );
  }
}

export default Spinner;
