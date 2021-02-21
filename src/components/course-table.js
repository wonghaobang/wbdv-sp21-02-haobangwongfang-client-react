import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";

export default class CourseTable extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
    }


    render() {
        return (                 // remember can only return one thing, that's why need to wrap it into one div
            <div>
                {/*<h2>Course Table</h2>*/}
                <Link to="/courses/grid">
                    <i className="fas fa-2x fa-th float-right"></i>
                </Link>
                <table className="table">

                    <tbody>

                    {
                        this.props.courses.map((course, ndx) =>
                            <CourseRow
                                // whenever you iterate/generate objects in an array like this, need to guarantee
                                // that each element has a unique identifier. In this case I know title can be unique.
                                // Later on when this comes from the server, we are going to have an id and use that instead
                                updateCourse={this.props.updateCourse}
                                deleteCourse={this.props.deleteCourse}
                                key={ndx}
                                course={course}
                                title={course.title}
                                owner={course.owner}
                                lastModified={course.lastModified}
                            />)
                    }
                    </tbody>

                </table>

            </div>
        )
    }
}