

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content content={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({ content }) => {
    return (
        <div>
            {content.map(part => <Part key={part.id} part={part} />)}
        </div>

    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({ parts }) => {

    const total = () => parts.reduce((accumulator, parts) => {
        return accumulator + parts.exercises
    }, 0)

    return <p><strong>total of {total()} exercises</strong></p>
}

export default Course