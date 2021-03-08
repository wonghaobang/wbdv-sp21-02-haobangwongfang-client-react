import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";
import './course-table.css';

class CourseTable extends React.Component {

    constructor(props) {
        super(props)
        // console.log(props)
    }


    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col" className="header">Title</th>
                        <th scope="col" className="d-none d-sm-table-cell header">
                            Owned by
                        </th>
                        <th scope="col" className="d-none d-md-table-cell header">
                            Last modified
                        </th>
                        <th scope="col" className="header">
                            <i className="fas fa-sort-alpha-up float-right pr-3"></i>
                            <i className="fas fa-folder float-right pr-3"></i>
                        </th>
                        <th scope="col" className="header">
                            <Link to="/courses/grid">
                                <i className="fas fa-th"></i>
                            </Link>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.props.courses.map((course, ndx) =>
                            <CourseRow
                                updateCourse={this.props.updateCourse}
                                deleteCourse={this.props.deleteCourse}
                                key={course._id}
                                course={course}
                                title={course.title}
                                owner={course.owner}
                                lastModified={course.lastModified}
                                to={`/courses/table/edit/${course._id}`}
                            />)
                    }
                    </tbody>

                </table>

            </div>
        )
    }
}

export default CourseTable