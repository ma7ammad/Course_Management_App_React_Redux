import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        title: "",
      },
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course }); // this.state({ course }); will suffice
  };

  handleSubmit = (event) => {
    event.preventDefault(); //prevents the submit click from posting to server and reloading page
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />

        <input type="submit" value="Save" />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // , ownProps not needed here as parameter
  return {
    courses: state.courses, //be specific and request only data needed by components
  };
}

export default connect(mapStateToProps)(CoursesPage); //, mapDispatchToProps not needed as a 'connect' parameter
// connect will auto pass propTypes as 2nd arg is ommited
