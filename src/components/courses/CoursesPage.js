import React from "react";

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

  render() {
    return (
      <form>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />

        <input type="submit" value="Save" />
      </form>
    );
  }
}

export default CoursesPage;
