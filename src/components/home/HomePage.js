import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Course Management</h1>
    <p>React, Redux and React Router for ultra-responsive web apps.</p>
    {/* using react-router-dom Link avoids posting back to server, but uses client to handle all routing => faster */}
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
