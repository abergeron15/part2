const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ total }) => <b>Number of exercises {total}</b>

const Course = ({ course }) => {
  console.log(course);


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        // I already did reduce in the previous exercise
        total={course.parts.reduce((acc, val) =>
          acc + val.exercises,
          0
        )} />
    </div>
  )
}

export default Course