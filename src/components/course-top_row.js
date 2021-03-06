import React from 'react'
import './course-top-row.css';


const CourseTopRow = ({addCourse, getValue, title}) =>
    <div className="row p-1 mb-2">
        <div className="col-1">
            <i className="fas fa-bars fa-2x"></i>
        </div>
        <div className="col-2 d-none d-xl-block wbdv-font-size-25">
            Course Manager
        </div>
        <div className="col-8">
            <input type="text" className="form-control" placeholder="New Course Title" value={title} onChange={getValue}/>
        </div>
        <div onClick={addCourse} className="col-1 fa-stack fa-lg plus-icon1">
            <i className="fas fa-circle fa-stack-2x"></i>
            <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
        </div>

        <span onClick={addCourse} className="fa-stack fa-2x plus-icon2">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
        </span>
    </div>


export default CourseTopRow