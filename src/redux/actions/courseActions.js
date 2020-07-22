export function createCourse(course) {
  return { type: "CREATE_COURSE", course }; //object shorthand syntax

  // return { type: "CREATE_COURSE", course: course };
}
