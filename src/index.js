import React from "react";
import { render } from "react-dom";
import { func } from "prop-types";

function Hi() {
  return <p>Hi Mohamed</p>;
}

render(<Hi />, document.getElementById("app"));
