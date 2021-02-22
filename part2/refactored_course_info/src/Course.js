import React from "react";

const Total = ({ course }) => {
  const { parts } = course;
  const total = parts.reduce((sum, item) => sum + item.exercises, 0);
  return (
    <p>
      <b>Total number of exercises - {total}</b>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h3>{course.name}</h3>
            {course.parts.map((part) => {
              return <Part part={part} key={part.id} />;
            })}
            <Total course={course} />
          </div>
        );
      })}
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <h1>Web development curriculum</h1>
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      <Header courses={courses} />
      <Content courses={courses} />
    </div>
  );
};

export default Course;
