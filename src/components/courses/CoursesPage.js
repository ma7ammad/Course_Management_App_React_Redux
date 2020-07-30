import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";

class CoursesPage extends React.Component {
  // state = {
  //   redirectToAddCoursePage: false,
  // };

  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        alert("Loading courses failed " + error);
      });
    }

    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert("Loading authors failed " + error);
      });
    }
  }
  render() {
    return (
      <>
        {/* {this.state.redirectToAddCoursePage && <Redirect to="/course" />} */}

        <h2>Courses</h2>
        <Link
          style={{ marginBottom: 20 }}
          className="btn btn-primary"
          to="/course"
        >
          Add Course
        </Link>
        {/* <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button> */}
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  // , ownProps not needed here as parameter
  return {
    //pass courses on props
    courses:
      state.authors.length === 0 //check whether author data is available
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name, //add extra property authorName to the array of courses
            };
          }), //be specific and request only data needed by components

    authors: state.authors,
  };
}

//specifying the actions we like to pass in on props
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
