import React, { useEffect, useState } from "react"; //using useEffect Hook
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

///////////////////////////////////////////////////////////////////////////////////////////////
//component

function ManageCoursePage(props) {
  // function ManageCoursePage({ courses, authors, loadCourses, loadAuthors, saveCourse, history, ...props })
  // '...props' is called a rest operator, which is diferent than the spread operator ...props.course
  // '...props' assigns any variables not destructured on the left to a variable 'props'

  const {
    courses,
    authors,
    loadCourses,
    loadAuthors,
    saveCourse,
    history, // any component loaded via <Route> gets history passed in via props from React Router
  } = props;
  //setting State to hold the form-field-values before they are saved
  const [course, setCourse] = useState({ ...props.course }); // Course = state variable, setState = setter function for that value
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed " + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed " + error);
      });
    }
  }, [props.course]); //[] = componentDidMount : will run only once when mounting the component

  function handleChange(event) {
    //destructuring neccessary here to avoid event getting garbage collected, so that it is now available within nested setCourse callback
    //retaining a local reference to the event
    const { name, value } = event.target;
    //using the functional form of setState to safely set new state that's based on the existing state
    setCourse((prevCourse) => ({
      ...prevCourse,
      //using JS computed prop syntax: allows referencing a prop via a variable
      [name]: name === "authorId" ? parseInt(value, 10) : value,
      //authorId is the only Int, the rest can stay as string
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return (
    <>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
      />
    </>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////
//PrpoTypes declaration

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
///////////////////////////////////////////////////////////////////////////////////////////////

//Redux mapping functions determining what state & action we'd like to access in component
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    //pass courses on props
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

//using Object Form instead of function to specify the actions we like to pass in on props
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};
///////////////////////////////////////////////////////////////////////////////////////////////

//call to connect: connecting component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

///////////////////////////////////////////////////////////////////////////////////////////////
