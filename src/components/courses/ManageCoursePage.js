import React, { useEffect, useState } from "react"; //using useEffect Hook
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

///////////////////////////////////////////////////////////////////////////////////////////////
//component

function ManageCoursesPage(props) {
  // function ManageCoursesPage({ courses, authors, loadCourses, loadAuthors, ...props })
  // ...props is called a rest operator, which is diferent than the spread operator ...props.course
  // ..props assigns any variables not destructured on the left to a variable 'props'

  const { courses, authors, loadCourses, loadAuthors } = props;
  //setting State to hold the form-field-values before they are saved
  const [course, setCourse] = useState({ ...props.course }); // Course = state variable, setState = setter function for that value
  const [errors, setErrors] = useState({ ...props.course }); // Course = state variable, setState = setter function for that value

  useEffect(() => {
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
  }, []); //[] = componentDidMount : will run only once when mounting the component

  return (
    <>
      <CourseForm course={course} errors={errors} authors={authors} />
    </>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////
//PrpoTypes declaration

ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
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
    course: newCourse,
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
