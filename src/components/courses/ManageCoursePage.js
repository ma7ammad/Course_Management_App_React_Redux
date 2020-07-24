import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

///////////////////////////////////////////////////////////////////////////////////////////////
//component

class ManageCoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed " + error);
      });
    }

    if (authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
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
  actions: PropTypes.object.isRequired,
};
///////////////////////////////////////////////////////////////////////////////////////////////

//Redux mapping functions determining what state & action we'd like to access in component

function mapStateToProps(state) {
  // , ownProps not needed here as parameter
  return {
    //pass courses on props
    courses: state.courses,
    auhtors: state.auhtors,
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
///////////////////////////////////////////////////////////////////////////////////////////////

//call to connect: connecting component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);

///////////////////////////////////////////////////////////////////////////////////////////////
