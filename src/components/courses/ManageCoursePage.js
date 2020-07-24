import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

///////////////////////////////////////////////////////////////////////////////////////////////
//component

class ManageCoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, loadCourses, loadAuthors } = this.props;

    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed " + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed " + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
//PrpoTypes declaration

ManageCoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};
///////////////////////////////////////////////////////////////////////////////////////////////

//Redux mapping functions determining what state & action we'd like to access in component

function mapStateToProps(state) {
  // , ownProps not needed here as parameter
  return {
    //pass courses on props
    courses: state.courses,
    authors: state.authors,
  };
}

//using Object Form instead of function to specify the actions we like to pass in on props
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
};
///////////////////////////////////////////////////////////////////////////////////////////////

//call to connect: connecting component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);

///////////////////////////////////////////////////////////////////////////////////////////////
