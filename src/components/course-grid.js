import React from 'react'
import CourseCard from "./course-card-file/course-card";
import {Link} from "react-router-dom";


const CourseGrid = ({courses, deleteCourse, updateCourse}) =>
    <div>

        <div className="row mb-3">
            <div className="col d-none d-md-block font-weight-bold">
                Recent Documents
            </div>
            <div className="col d-none d-md-block font-weight-bold">
                Owned by me
                <i className="fas fa-caret-down"></i>
            </div>
            <div className="col">
                <span className="float-right">
                    <i className="fas fa-folder pr-3"></i>
                    <i className="fas fa-sort-alpha-up pr-3"></i>
                    <Link to="/courses/table">
                        <i className="fas fa-list"></i>
                    </Link>
                </span>
            </div>

        </div>

        <div className="row">
            {
                courses.map((course, ndx) =>
                    <CourseCard
                        updateCourse={updateCourse}
                        deleteCourse={deleteCourse}
                        key={course._id}
                        course={course}/>

                )
            }
        </div>

    </div>


export default CourseGrid